const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const rateLimit = require('express-rate-limit');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  'http://localhost:3000',
  process.env.CORS_ORIGIN
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.some(allowed => origin.startsWith(allowed)) || origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }
    return callback(new Error('No permitido por CORS'));
  },
  credentials: true
}));
app.use(express.json());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { error: 'Demasiadas peticiones, intenta de nuevo mas tarde.' }
});
app.use('/api/', apiLimiter);

const adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader === 'Bearer ' + (process.env.ADMIN_PASSWORD || 'admin123')) {
    next();
  } else {
    res.status(401).json({ error: 'No autorizado' });
  }
};

app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/data', async (req, res) => {
  try {
    const cities = await prisma.city.findMany();
    const companiesArray = await prisma.company.findMany();
    const companies = {};
    companiesArray.forEach(comp => { companies[comp.id] = comp; });
    const routesData = await prisma.route.findMany({ include: { schedules: true } });
    const routes = routesData.map(route => ({
      id: route.id, origin: route.originId, destination: route.destinationId,
      company: route.companyId, line: route.line, platform: route.platform,
      estimatedPrice: route.estimatedPrice,
      schedules: {
        weekdays: route.schedules.filter(s => s.dayType === 'WEEKDAYS').map(s => ({ id: s.id, time: s.time, service: s.service, via: s.via, isExpress: s.isExpress })),
        saturdays: route.schedules.filter(s => s.dayType === 'SATURDAYS').map(s => ({ id: s.id, time: s.time, service: s.service, via: s.via, isExpress: s.isExpress })),
        sundays: route.schedules.filter(s => s.dayType === 'SUNDAYS').map(s => ({ id: s.id, time: s.time, service: s.service, via: s.via, isExpress: s.isExpress }))
      }
    }));
    res.json({ cities, companies, routes });
  } catch (error) { res.status(500).json({ error: 'Error interno del servidor' }); }
});

app.get('/api/admin/routes', adminAuth, async (req, res) => {
  try {
    const routes = await prisma.route.findMany({ include: { origin: true, destination: true, company: true, schedules: true } });
    res.json(routes);
  } catch (error) { res.status(500).json({ error: 'Error obteniendo rutas' }); }
});

app.post('/api/admin/routes', adminAuth, async (req, res) => {
  try {
    const { id, originId, destinationId, companyId, line, platform, estimatedPrice } = req.body;
    const route = await prisma.route.create({ data: { id, originId, destinationId, companyId, line, platform, estimatedPrice } });
    res.json(route);
  } catch (error) { res.status(500).json({ error: 'Error creando ruta: ' + error.message }); }
});

app.put('/api/admin/routes/:id', adminAuth, async (req, res) => {
  try {
    const { line, platform, estimatedPrice, originId, destinationId, companyId } = req.body;
    const updated = await prisma.route.update({ where: { id: req.params.id }, data: { line, platform, estimatedPrice, originId, destinationId, companyId } });
    res.json(updated);
  } catch (error) { res.status(500).json({ error: 'Error actualizando ruta' }); }
});

app.delete('/api/admin/routes/:id', adminAuth, async (req, res) => {
  try {
    await prisma.schedule.deleteMany({ where: { routeId: req.params.id } });
    await prisma.route.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error) { res.status(500).json({ error: 'Error eliminando ruta' }); }
});

app.get('/api/admin/routes/:id/schedules', adminAuth, async (req, res) => {
  try {
    const schedules = await prisma.schedule.findMany({ where: { routeId: req.params.id }, orderBy: { time: 'asc' } });
    res.json(schedules);
  } catch (error) { res.status(500).json({ error: 'Error obteniendo horarios' }); }
});

app.post('/api/admin/schedules', adminAuth, async (req, res) => {
  try {
    const { routeId, dayType, time, service, via, isExpress } = req.body;
    const schedule = await prisma.schedule.create({ data: { routeId, dayType, time, service, via, isExpress: isExpress || false } });
    res.json(schedule);
  } catch (error) { res.status(500).json({ error: 'Error creando horario: ' + error.message }); }
});

app.put('/api/admin/schedules/:id', adminAuth, async (req, res) => {
  try {
    const { time, dayType, service, via, isExpress } = req.body;
    const updated = await prisma.schedule.update({ where: { id: parseInt(req.params.id) }, data: { time, dayType, service, via, isExpress: isExpress || false } });
    res.json(updated);
  } catch (error) { res.status(500).json({ error: 'Error actualizando horario' }); }
});

app.delete('/api/admin/schedules/:id', adminAuth, async (req, res) => {
  try {
    await prisma.schedule.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ success: true });
  } catch (error) { res.status(500).json({ error: 'Error eliminando horario' }); }
});

app.get('/api/admin/cities', adminAuth, async (req, res) => {
  try { res.json(await prisma.city.findMany()); }
  catch (error) { res.status(500).json({ error: 'Error obteniendo ciudades' }); }
});

app.get('/api/admin/companies', adminAuth, async (req, res) => {
  try { res.json(await prisma.company.findMany()); }
  catch (error) { res.status(500).json({ error: 'Error obteniendo empresas' }); }
});

app.get('/api/alerts', async (req, res) => {
  try {
    const alerts = await prisma.alert.findMany({ 
      where: { 
        isActive: true,
        OR: [
          { expiresAt: null },
          { expiresAt: { gt: new Date() } }
        ]
      }, 
      orderBy: { createdAt: 'desc' } 
    });
    res.json(alerts);
  } catch (error) { res.status(500).json({ error: 'Error obteniendo alertas' }); }
});

app.post('/api/alerts', adminAuth, async (req, res) => {
  try {
    const { tag, title, detail, severity, expiresInHours } = req.body;
    let expiresAt = null;
    if (expiresInHours && !isNaN(expiresInHours)) {
      expiresAt = new Date(Date.now() + Number(expiresInHours) * 60 * 60 * 1000);
    }
    const newAlert = await prisma.alert.create({ 
      data: { tag, title, detail, severity: severity || 'gray', expiresAt } 
    });
    res.json(newAlert);
  } catch (error) { res.status(500).json({ error: 'Error creando alerta' }); }
});

app.delete('/api/alerts/:id', adminAuth, async (req, res) => {
  try {
    await prisma.alert.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ success: true });
  } catch (error) { res.status(500).json({ error: 'Error eliminando alerta' }); }
});

let weatherCache = null;
let lastWeatherFetch = 0;

app.get('/api/weather', async (req, res) => {
  const apiKey = process.env.WEATHER_API_KEY;
  if (!apiKey) return res.json({ temp: '--', condition: 'Clima' });
  
  // Cache por 10 minutos
  if (weatherCache && (Date.now() - lastWeatherFetch < 600000)) {
    return res.json(weatherCache);
  }

  try {
    const lat = -33.3661;
    const lon = -69.1479;
    
    const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${apiKey.trim()}`);
    if (!resp.ok) {
      const errText = await resp.text();
      throw new Error(`Weather API Error: ${resp.status} - ${errText}`);
    }
    const data = await resp.json();
    
    let tomorrowForecast = null;
    try {
      const forecastResp = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${apiKey.trim()}`);
      if (forecastResp.ok) {
        const forecastData = await forecastResp.json();
        
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowStr = tomorrow.getFullYear() + '-' + String(tomorrow.getMonth()+1).padStart(2,'0') + '-' + String(tomorrow.getDate()).padStart(2,'0');
        
        const tomorrowItems = forecastData.list.filter(item => item.dt_txt.startsWith(tomorrowStr));
        if (tomorrowItems.length > 0) {
          const maxTemp = Math.max(...tomorrowItems.map(i => i.main.temp_max));
          const minTemp = Math.min(...tomorrowItems.map(i => i.main.temp_min));
          
          const midItem = tomorrowItems.find(i => i.dt_txt.includes('12:00:00')) || tomorrowItems[Math.floor(tomorrowItems.length / 2)];
          tomorrowForecast = {
            max: Math.round(maxTemp),
            min: Math.round(minTemp),
            condition: midItem.weather[0].description,
            iconId: midItem.weather[0].icon
          };
        }
      }
    } catch (err) {
      console.warn("No se pudo obtener el pronóstico de mañana", err.message);
    }
    
    weatherCache = {
      temp: Math.round(data.main.temp),
      condition: data.weather[0].description,
      iconId: data.weather[0].icon,
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      wind: Math.round(data.wind.speed * 3.6), // Convertir m/s a km/h
      min: Math.round(data.main.temp_min),
      max: Math.round(data.main.temp_max),
      tomorrow: tomorrowForecast
    };
    lastWeatherFetch = Date.now();
    
    res.json(weatherCache);
  } catch (error) {
    console.error('Error fetching weather:', error.message);
    res.json({ temp: '--', condition: 'Clima' });
  }
});

app.listen(PORT, () => {
  console.log('BondiHora Backend corriendo en http://localhost:' + PORT);
});

