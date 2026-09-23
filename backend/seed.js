const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const prisma = new PrismaClient();

const sandbox = { window: {} };
vm.createContext(sandbox);

function loadScript(filePath) {
  const code = fs.readFileSync(filePath, 'utf-8');
  vm.runInContext(code, sandbox);
}

async function main() {
  console.log('Cargando archivos de datos antiguos...');
  
  loadScript(path.join(__dirname, '../frontend/js/data/cities.js'));
  loadScript(path.join(__dirname, '../frontend/js/data/companies.js'));
  
  const terminalsDir = path.join(__dirname, '../frontend/js/data/X-terminales');
  fs.readdirSync(terminalsDir).forEach(file => {
    if (file.endsWith('.js')) loadScript(path.join(terminalsDir, file));
  });

  const routesDir = path.join(__dirname, '../frontend/js/data/Recorridos');
  fs.readdirSync(routesDir).forEach(file => {
    if (file.endsWith('.js')) loadScript(path.join(routesDir, file));
  });

  const { BUS_CITIES, BUS_COMPANIES, BUS_ROUTES } = sandbox.window;

  console.log('Limpiando base de datos en Neon...');
  await prisma.schedule.deleteMany();
  await prisma.route.deleteMany();
  await prisma.city.deleteMany();
  await prisma.company.deleteMany();

  console.log('Insertando Ciudades...');
  for (const city of BUS_CITIES) {
    await prisma.city.create({ data: { id: city.id, name: city.name } });
  }

  console.log('Insertando Empresas...');
  for (const [id, comp] of Object.entries(BUS_COMPANIES)) {
    await prisma.company.create({ 
      data: { id, name: comp.name, short: comp.short, badge: comp.badge } 
    });
  }

  console.log('Insertando Rutas y Horarios...');
  for (const route of BUS_ROUTES) {
    await prisma.route.create({
      data: {
        id: route.id,
        originId: route.origin,
        destinationId: route.destination,
        companyId: route.company,
        line: route.line,
        platform: route.platform,
        estimatedPrice: route.estimatedPrice
      }
    });

    const createSchedules = async (dayType, schedulesArray) => {
      if (!schedulesArray) return;
      for (const sch of schedulesArray) {
        await prisma.schedule.create({
          data: {
            routeId: route.id,
            dayType: dayType,
            time: sch.time,
            service: sch.service,
            via: sch.via
          }
        });
      }
    };

    if (route.schedules) {
      await createSchedules('WEEKDAYS', route.schedules.weekdays);
      await createSchedules('SATURDAYS', route.schedules.saturdays);
      await createSchedules('SUNDAYS', route.schedules.sundays);
    }
  }

  console.log('✅ Migración completada exitosamente.');
}

main()
  .catch(e => {
    console.error('Error durante la migración:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
