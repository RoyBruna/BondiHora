document.addEventListener('DOMContentLoaded', () => {
  const selectOrigin = document.getElementById('select-origin');
  const selectDestination = document.getElementById('select-destination');
  const btnSwap = document.getElementById('btn-swap');
  const btnSearch = document.getElementById('btn-search');
  
  const liveClockElement = document.getElementById('live-clock');
  const currentDayBadge = document.getElementById('current-day-badge');
  const themeToggleBtn = document.getElementById('theme-toggle');

  const tabUpcoming = document.getElementById('tab-upcoming');
  const tabTimetable = document.getElementById('tab-timetable');
  const viewUpcomingContainer = document.getElementById('view-upcoming');
  const viewTimetableContainer = document.getElementById('view-timetable');

  const featuredCardContainer = document.getElementById('featured-bus-container');
  const upcomingListContainer = document.getElementById('upcoming-list-container');
  
  const timetableBody = document.getElementById('timetable-body');
  const timetableTitle = document.getElementById('timetable-title');
  const dayButtons = document.querySelectorAll('.day-btn');

  let activeView = 'upcoming';
  let selectedDayType = ScheduleEngine.getDayType();
  let currentFilter = 'all';
  let mapInstance = null;
  let mapTileLayer = null;

  const TERMINAL_LOCATIONS = [
    { id: 'tupungato', name: 'Tupungato', desc: 'Terminal de Ómnibus de Tupungato', lat: -33.36608420003635, lng: -69.14787273564028, url: 'https://maps.app.goo.gl/zGyChAWt2tQDAA1b9' },
    { id: 'tunuyan', name: 'Tunuyán', desc: 'Terminal de Ómnibus de Tunuyán', lat: -33.57780941689543, lng: -69.01192117013841, url: 'https://maps.app.goo.gl/R8knAxZyuLRDZEkv7' },
    { id: 'mendoza', name: 'Mendoza Capital', desc: 'Terminal del Sol - Capital Mendoza', lat: -32.894226445291174, lng: -68.83052462503562, url: 'https://maps.app.goo.gl/1mnTW6ydYHUCuXeL8' },
    { id: 'eugeniobustos', name: 'Eugenio Bustos', desc: 'Terminal / Parada Eugenio Bustos', lat: -33.778114102311505, lng: -69.06083718993537, url: 'https://maps.app.goo.gl/3LivNi6uE2kggt7U8' },
    { id: 'laconsulta', name: 'La Consulta', desc: 'Terminal de Ómnibus La Consulta', lat: -33.736416395176, lng: -69.11783680748712, url: 'https://maps.app.goo.gl/PmxhWL5aL2bWBUMW7' },
    { id: 'vistaflores', name: 'Vista Flores', desc: 'Paradas Principales (Sin terminal fija)', lat: -33.65275631521484, lng: -69.15589259665562, url: 'https://www.google.com/maps/search/?api=1&query=-33.65275631521484,-69.15589259665562' },
    { id: 'pareditas', name: 'Pareditas', desc: 'Paradas Principales (Sin terminal fija)', lat: -33.93992086972068, lng: -69.07876518267187, url: 'https://www.google.com/maps/search/?api=1&query=-33.93992086972068,-69.07876518267187' }
  ];

  initApp();

  function initApp() {
    populateCitySelects();
    setupClock();
    setupTheme();
    setupEventListeners();
    setupAlarmModalListeners();
    renderResults();
    initMap();
  }

  function populateCitySelects() {
    selectOrigin.innerHTML = '';
    selectDestination.innerHTML = '';

    BUS_DATA.cities.forEach(city => {
      const optOrigin = document.createElement('option');
      optOrigin.value = city.id;
      optOrigin.textContent = city.name;
      selectOrigin.appendChild(optOrigin);

      const optDest = document.createElement('option');
      optDest.value = city.id;
      optDest.textContent = city.name;
      selectDestination.appendChild(optDest);
    });

    selectOrigin.value = 'tupungato';
    selectDestination.value = 'tunuyan';
  }

  function setupClock() {
    function updateClock() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      if (liveClockElement) {
        liveClockElement.innerHTML = `${hours}:${minutes}<span class="clock-seconds">:${seconds}</span>`;
      }
      
      const dayTypeName = ScheduleEngine.getDayTypeName(ScheduleEngine.getDayType(now));
      if (currentDayBadge) {
        currentDayBadge.textContent = dayTypeName;
      }
    }

    updateClock();
    setInterval(updateClock, 1000);
  }

  function setupEventListeners() {
    let rotation = 0;
    btnSwap.addEventListener('click', () => {
      rotation += 180;
      btnSwap.style.transform = `rotate(${rotation}deg)`;
      const temp = selectOrigin.value;
      selectOrigin.value = selectDestination.value;
      selectDestination.value = temp;
      renderResults();
    });

    btnSearch.addEventListener('click', (e) => {
      e.preventDefault();
      renderResults();
    });

    tabUpcoming.addEventListener('click', () => {
      activeView = 'upcoming';
      tabUpcoming.classList.add('active');
      tabTimetable.classList.remove('active');
      viewUpcomingContainer.style.display = 'block';
      viewTimetableContainer.style.display = 'none';
      renderResults();
    });

    tabTimetable.addEventListener('click', () => {
      activeView = 'timetable';
      tabTimetable.classList.add('active');
      tabUpcoming.classList.remove('active');
      viewUpcomingContainer.style.display = 'none';
      viewTimetableContainer.style.display = 'block';
      renderResults();
    });

    const filterChips = document.querySelectorAll('#quick-filters .filter-chip');
    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentFilter = chip.dataset.filter;
        renderResults();
      });
    });

    dayButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        dayButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedDayType = btn.dataset.day;
        renderTimetable();
      });
    });

    selectOrigin.addEventListener('change', renderResults);
    selectDestination.addEventListener('change', renderResults);
  }

  function renderResults() {
    const origin = selectOrigin.value;
    const destination = selectDestination.value;

    if (origin === destination) {
      showSameCityWarning();
      return;
    }

    if (activeView === 'upcoming') {
      renderUpcomingDepartures(origin, destination);
    } else {
      renderTimetable();
    }
  }

  function showSameCityWarning() {
    featuredCardContainer.innerHTML = `
      <div class="empty-state">
        <h4>Origen y Destino son iguales</h4>
        <p>Selecciona una localidad de destino diferente.</p>
      </div>
    `;
    upcomingListContainer.innerHTML = '';
    timetableBody.innerHTML = `<tr><td colspan="5" class="empty-state">Selecciona un origen y destino diferentes.</td></tr>`;
  }

  function renderUpcomingDepartures(origin, destination) {
    const departures = ScheduleEngine.getNextDepartures(origin, destination, new Date(), currentFilter);

    if (departures.length === 0) {
      featuredCardContainer.innerHTML = `
        <div class="empty-state">
          <h4>Sin salidas disponibles</h4>
          <p>No hay frecuencias registradas con el filtro seleccionado para este recorrido.</p>
        </div>
      `;
      upcomingListContainer.innerHTML = '';
      return;
    }

    const nextBus = departures[0];
    const now = new Date();
    const currentMins = now.getHours() * 60 + now.getMinutes();
    const countdownText = ScheduleEngine.formatCountdown(nextBus.minutes, currentMins);

    const originName = selectOrigin.options[selectOrigin.selectedIndex].text;
    const destName = selectDestination.options[selectDestination.selectedIndex].text;

    featuredCardContainer.innerHTML = `
      <div class="featured-bus-card">
        <div class="featured-card-top">
          <div class="company-badge-group">
            <span class="company-tag ${nextBus.companyBadge}">${nextBus.company}</span>
            <span class="service-pill">${nextBus.service}</span>
            <span class="status-live-pill">
              <span class="live-dot"></span> Próxima Salida
            </span>
          </div>
          <span class="duration-badge">⏱️ ${nextBus.duration} aprox</span>
        </div>

        <div class="featured-card-main">
          <div class="time-block">
            <div class="time-main">${nextBus.time} <small class="time-unit">hs</small></div>
            <div class="countdown-tag">${countdownText}</div>
          </div>

          <div class="route-block">
            <div class="route-title">${originName} → ${destName}</div>
            <div class="via-subtitle">${nextBus.via} • ${nextBus.platform}</div>
          </div>

          <div class="action-block">
            <span class="price-text">${nextBus.price}</span>
            <button class="btn-alarm-trigger icon-only" data-time="${nextBus.time}" data-company="${nextBus.company}" data-route="${originName} → ${destName} (${nextBus.via})" title="Programar alarma para las ${nextBus.time} hs" aria-label="Programar alarma">⏰</button>
          </div>
        </div>
      </div>
    `;

    const remainingDepartures = departures.slice(1, 10);
    if (remainingDepartures.length > 0) {
      upcomingListContainer.innerHTML = remainingDepartures.map(bus => `
        <div class="bus-card">
          <div class="bus-card-left">
            <div class="bus-time">${bus.time} <small class="time-unit">hs</small></div>
            <div class="bus-company-info">
              <div class="company-name">${bus.company}</div>
              <div class="via-text">${bus.via} • ${bus.service}</div>
            </div>
          </div>
          <div class="bus-card-right">
            <span class="meta-pill">⏱️ ${bus.duration}</span>
            <span class="price-pill">${bus.price}</span>
            <button class="btn-alarm-trigger icon-only" data-time="${bus.time}" data-company="${bus.company}" data-route="${originName} → ${destName} (${bus.via})" title="Programar alarma para las ${bus.time} hs" aria-label="Programar alarma">⏰</button>
          </div>
        </div>
      `).join('');
    } else {
      upcomingListContainer.innerHTML = '';
    }
  }

  function renderTimetable() {
    const origin = selectOrigin.value;
    const destination = selectDestination.value;
    const rows = ScheduleEngine.getTimetable(origin, destination, selectedDayType);

    const originName = selectOrigin.options[selectOrigin.selectedIndex].text;
    const destName = selectDestination.options[selectDestination.selectedIndex].text;
    
    if (timetableTitle) {
      timetableTitle.textContent = `Planilla Completa: ${originName} -> ${destName}`;
    }

    if (rows.length === 0) {
      timetableBody.innerHTML = `
        <tr>
          <td colspan="5" class="empty-state">
            No hay horarios registrados para este día en este recorrido.
          </td>
        </tr>
      `;
      return;
    }

    const now = new Date();
    const currentMins = now.getHours() * 60 + now.getMinutes();
    const currentDayType = ScheduleEngine.getDayType(now);

    let nextFound = false;

    timetableBody.innerHTML = rows.map(row => {
      let isNext = false;
      if (!nextFound && selectedDayType === currentDayType && row.minutes >= currentMins) {
        isNext = true;
        nextFound = true;
      }

      return `
        <tr class="${isNext ? 'next-highlight' : ''}">
          <td class="time-cell">${row.time} hs ${isNext ? '<span class="badge-next">PRÓXIMO</span>' : ''}</td>
          <td><strong>${row.company}</strong></td>
          <td>${row.service}</td>
          <td>${row.via}</td>
          <td style="text-align: center;">
            <button class="btn-alarm-trigger icon-only" data-time="${row.time}" data-company="${row.company}" data-route="${originName} → ${destName} (${row.via})" title="Programar alarma para las ${row.time} hs" aria-label="Programar alarma">⏰</button>
          </td>
        </tr>
      `;
    }).join('');
  }

  let selectedAlarmData = null;
  let selectedOffsetMinutes = 10;

  function setupAlarmModalListeners() {
    const alarmModal = document.getElementById('alarm-modal');
    const closeBtn = document.getElementById('close-alarm-modal');
    const cancelModalBtn = document.getElementById('cancel-alarm-modal-btn');
    const confirmBtn = document.getElementById('confirm-alarm-btn');
    const optionsContainer = document.getElementById('alarm-options-container');
    const cancelActiveAlarmBtn = document.getElementById('cancel-active-alarm-btn');

    document.addEventListener('click', (e) => {
      const alarmBtn = e.target.closest('.btn-alarm-trigger');
      if (alarmBtn) {
        const time = alarmBtn.dataset.time;
        const company = alarmBtn.dataset.company;
        const route = alarmBtn.dataset.route;

        selectedAlarmData = { departureTime: time, company, route };
        
        const modalTime = document.getElementById('modal-bus-time');
        const modalCompany = document.getElementById('modal-bus-company');
        const modalRoute = document.getElementById('modal-bus-route');

        if (modalTime) modalTime.textContent = `${time} hs`;
        if (modalCompany) modalCompany.textContent = company;
        if (modalRoute) modalRoute.textContent = route;

        if (alarmModal) alarmModal.style.display = 'flex';
      }
    });

    const closeModal = () => {
      if (alarmModal) alarmModal.style.display = 'none';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelModalBtn) cancelModalBtn.addEventListener('click', closeModal);

    if (optionsContainer) {
      optionsContainer.querySelectorAll('.alarm-opt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          optionsContainer.querySelectorAll('.alarm-opt-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          selectedOffsetMinutes = parseInt(btn.dataset.offset, 10);
        });
      });
    }

    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        if (!selectedAlarmData) return;
        
        AlarmEngine.setAlarm({
          company: selectedAlarmData.company,
          route: selectedAlarmData.route,
          departureTime: selectedAlarmData.departureTime,
          offsetMinutes: selectedOffsetMinutes
        });

        closeModal();
        updateActiveAlarmToast();
      });
    }

    if (cancelActiveAlarmBtn) {
      cancelActiveAlarmBtn.addEventListener('click', () => {
        AlarmEngine.cancelAlarm();
        updateActiveAlarmToast();
      });
    }

    updateActiveAlarmToast();
    AlarmEngine.startMonitoring(() => {
      updateActiveAlarmToast();
    });
  }

  function updateActiveAlarmToast() {
    const toast = document.getElementById('active-alarm-toast');
    const toastTime = document.getElementById('toast-alarm-time');
    const toastDesc = document.getElementById('toast-alarm-desc');
    if (!toast) return;

    const activeAlarm = AlarmEngine.getActiveAlarm();
    if (activeAlarm) {
      const alarmDate = new Date(activeAlarm.alarmTimeMs);
      const h = String(alarmDate.getHours()).padStart(2, '0');
      const m = String(alarmDate.getMinutes()).padStart(2, '0');

      if (toastTime) toastTime.textContent = `Alarma activa a las ${h}:${m} hs`;
      if (toastDesc) toastDesc.textContent = `${activeAlarm.company} (${activeAlarm.departureTime} hs)`;
      toast.style.display = 'block';
    } else {
      toast.style.display = 'none';
    }
  }

  function setupTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        updateMapTiles();
      });
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    updateThemeIcon(theme);
  }

  function updateThemeIcon(theme) {
    if (themeToggleBtn) {
      themeToggleBtn.textContent = theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro';
    }
  }

  // MAPA INTERACTIVO DE TERMINALES (Leaflet.js)

  function initMap() {
    const mapElement = document.getElementById('terminal-map');
    if (!mapElement || typeof L === 'undefined') return;

    mapInstance = L.map('terminal-map', {
      scrollWheelZoom: false
    }).setView([-33.35, -69.0], 9);

    updateMapTiles();
    populateMapChips();
    addTerminalMarkers();
  }

  function updateMapTiles() {
    if (!mapInstance) return;
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    
    if (mapTileLayer) {
      mapInstance.removeLayer(mapTileLayer);
    }

    const tileUrl = currentTheme === 'dark'
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
      : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    mapTileLayer = L.tileLayer(tileUrl, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19
    }).addTo(mapInstance);

    setTimeout(() => {
      mapInstance.invalidateSize();
    }, 250);
  }

  function addTerminalMarkers() {
    TERMINAL_LOCATIONS.forEach(term => {
      const gmapsUrl = term.url || `https://www.google.com/maps/search/?api=1&query=${term.lat},${term.lng}`;
      const popupHtml = `
        <div class="popup-content">
          <h4>${term.name}</h4>
          <p>${term.desc}</p>
          <a href="${gmapsUrl}" target="_blank" rel="noopener">Abrir en Google Maps</a>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `<div class="pin-inner">📍</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -30]
      });

      L.marker([term.lat, term.lng], { icon: customIcon })
        .addTo(mapInstance)
        .bindPopup(popupHtml);
    });
  }

  function populateMapChips() {
    const chipContainer = document.getElementById('map-chip-list');
    if (!chipContainer) return;
    
    chipContainer.innerHTML = TERMINAL_LOCATIONS.map((term, index) => `
      <button class="chip-btn ${index === 0 ? 'active' : ''}" data-lat="${term.lat}" data-lng="${term.lng}">
        ${term.name}
      </button>
    `).join('');

    chipContainer.querySelectorAll('.chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        chipContainer.querySelectorAll('.chip-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const lat = parseFloat(btn.dataset.lat);
        const lng = parseFloat(btn.dataset.lng);
        mapInstance.flyTo([lat, lng], 13, { duration: 1.2 });
      });
    });
  }
});
