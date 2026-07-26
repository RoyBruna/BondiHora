// Logica para calculo de horarios y filtros

const ScheduleEngine = {
  // Convierte hora HH:MM a minutos
  timeToMinutes(timeStr) {
    if (!timeStr) return 0;
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  },

  // Convierte minutos a texto HH:MM
  minutesToTime(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60) % 24;
    const mins = totalMinutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
  },

  // Obtiene el tipo de dia actual
  getDayType(date = new Date()) {
    const day = date.getDay();
    if (day === 0) return 'sundays';
    if (day === 6) return 'saturdays';
    return 'weekdays';
  },

  // Nombre legible del tipo de dia
  getDayTypeName(dayType) {
    const names = {
      weekdays: 'Lunes a Viernes (Habiles)',
      saturdays: 'Sabados',
      sundays: 'Domingos y Feriados'
    };
    return names[dayType] || names.weekdays;
  },

  // Calcula el tiempo faltante en texto
  formatCountdown(targetMinutes, currentMinutes) {
    let diff = targetMinutes - currentMinutes;
    if (diff < 0) {
      diff += 24 * 60;
    }

    if (diff <= 2) return 'Sale ahora';
    if (diff < 60) return `Sale en ${diff} min`;
    
    const hours = Math.floor(diff / 60);
    const mins = diff % 60;
    
    if (mins === 0) return `Sale en ${hours} hs`;
    return `Sale en ${hours} hs ${mins} min`;
  },

  // Busca las proximas salidas ordenadas por hora
  getNextDepartures(originId, destinationId, referenceDate = new Date()) {
    const currentMinutes = referenceDate.getHours() * 60 + referenceDate.getMinutes();
    const dayType = this.getDayType(referenceDate);

    const matchingRoutes = BUS_DATA.routes.filter(
      r => r.origin === originId && r.destination === destinationId
    );

    if (matchingRoutes.length === 0) return [];

    let departures = [];

    matchingRoutes.forEach(route => {
      const companyInfo = BUS_DATA.companies[route.company] || { name: 'Colectivo', badge: 'badge-primary' };
      const timesList = route.schedules[dayType] || [];

      timesList.forEach(item => {
        const itemMins = this.timeToMinutes(item.time);
        
        departures.push({
          time: item.time,
          minutes: itemMins,
          service: item.service,
          via: item.via,
          company: companyInfo.name,
          companyBadge: companyInfo.badge,
          line: route.line,
          platform: route.platform,
          price: route.estimatedPrice,
          routeId: route.id,
          diff: itemMins >= currentMinutes ? (itemMins - currentMinutes) : (itemMins - currentMinutes + 1440)
        });
      });
    });

    departures.sort((a, b) => a.diff - b.diff);

    return departures;
  },

  // Obtiene todos los horarios para la tabla completa
  getTimetable(originId, destinationId, dayType = 'weekdays') {
    const routes = BUS_DATA.routes.filter(
      r => r.origin === originId && r.destination === destinationId
    );

    let rows = [];

    routes.forEach(route => {
      const companyInfo = BUS_DATA.companies[route.company] || { name: 'Colectivo', badge: 'badge-primary' };
      const list = route.schedules[dayType] || [];

      list.forEach(item => {
        rows.push({
          time: item.time,
          minutes: this.timeToMinutes(item.time),
          service: item.service,
          via: item.via,
          line: route.line,
          company: companyInfo.name,
          platform: route.platform,
          price: route.estimatedPrice
        });
      });
    });

    rows.sort((a, b) => a.minutes - b.minutes);
    return rows;
  }
};
