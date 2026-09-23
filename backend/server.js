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
        weekdays: route.schedules.filter(s => s.dayType === 'WEEKDAYS').map(s => ({ id: s.id, time: s.time, service: s.service, via: s.via })),
        saturdays: route.schedules.filter(s => s.dayType === 'SATURDAYS').map(s => ({ id: s.id, time: s.time, service: s.service, via: s.via })),
        sundays: route.schedules.filter(s => s.dayType === 'SUNDAYS').map(s => ({ id: s.id, time: s.time, service: s.service, via: s.via }))
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
    const { routeId, dayType, time, service, via } = req.body;
    const schedule = await prisma.schedule.create({ data: { routeId, dayType, time, service, via } });
    res.json(schedule);
  } catch (error) { res.status(500).json({ error: 'Error creando horario: ' + error.message }); }
});

app.put('/api/admin/schedules/:id', adminAuth, async (req, res) => {
  try {
    const { time, dayType, service, via } = req.body;
    const updated = await prisma.schedule.update({ where: { id: parseInt(req.params.id) }, data: { time, dayType, service, via } });
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
    const alerts = await prisma.alert.findMany({ where: { isActive: true }, orderBy: { createdAt: 'desc' } });
    res.json(alerts);
  } catch (error) { res.status(500).json({ error: 'Error obteniendo alertas' }); }
});

app.post('/api/alerts', adminAuth, async (req, res) => {
  try {
    const { tag, title, detail, severity } = req.body;
    const newAlert = await prisma.alert.create({ data: { tag, title, detail, severity: severity || 'gray' } });
    res.json(newAlert);
  } catch (error) { res.status(500).json({ error: 'Error creando alerta' }); }
});

app.delete('/api/alerts/:id', adminAuth, async (req, res) => {
  try {
    await prisma.alert.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ success: true });
  } catch (error) { res.status(500).json({ error: 'Error eliminando alerta' }); }
});

app.listen(PORT, () => {
  console.log('BondiHora Backend corriendo en http://localhost:' + PORT);
});

