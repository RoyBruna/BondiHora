// Manejo de eventos y vista de la aplicacion

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

  initApp();

  function initApp() {
    populateCitySelects();
    setupClock();
    setupTheme();
    setupEventListeners();
    renderResults();
  }

  // Cargar ciudades en los select
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

  // Actualizar reloj y tipo de dia
  function setupClock() {
    function updateClock() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const timeString = `${hours}:${minutes}:${seconds}`;
      if (liveClockElement) {
        liveClockElement.textContent = timeString;
      }
      
      const dayTypeName = ScheduleEngine.getDayTypeName(ScheduleEngine.getDayType(now));
      if (currentDayBadge) {
        currentDayBadge.textContent = dayTypeName;
      }
    }

    updateClock();
    setInterval(updateClock, 1000);
  }

  // Eventos de botones e inputs
  function setupEventListeners() {
    btnSwap.addEventListener('click', () => {
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

  // Renderizar segun pestaña activa
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

  // Aviso cuando origen y destino son iguales
  function showSameCityWarning() {
    featuredCardContainer.innerHTML = `
      <div class="empty-state">
        <h4>Origen y Destino son iguales</h4>
        <p>Selecciona una localidad de destino diferente.</p>
      </div>
    `;
    upcomingListContainer.innerHTML = '';
    timetableBody.innerHTML = `<tr><td colspan="6" class="empty-state">Selecciona un origen y destino diferentes.</td></tr>`;
  }

  // Renderizar proximas salidas
  function renderUpcomingDepartures(origin, destination) {
    const departures = ScheduleEngine.getNextDepartures(origin, destination);

    if (departures.length === 0) {
      featuredCardContainer.innerHTML = `
        <div class="empty-state">
          <h4>Sin horarios registrados</h4>
          <p>No hay colectivos cargados para este recorrido.</p>
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
        <span class="featured-badge">PROXIMA SALIDA</span>
        <div class="featured-header">
          <div class="company-logo">BUS</div>
          <div class="bus-info-title">
            <h3>${nextBus.company} - ${nextBus.line}</h3>
            <p>${originName} -> ${destName}</p>
          </div>
        </div>
        
        <div class="featured-time-display">
          <span class="departure-clock">${nextBus.time} hs</span>
          <span class="time-countdown">${countdownText}</span>
        </div>

        <div class="featured-meta">
          <div class="meta-item">
            <span class="meta-label">Tipo Servicio</span>
            <span class="meta-value">${nextBus.service}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Recorrido</span>
            <span class="meta-value">${nextBus.via}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Tarifa Aprox.</span>
            <span class="meta-value">Próximamente</span>
          </div>
        </div>
      </div>
    `;

    const remainingDepartures = departures.slice(1, 7);
    if (remainingDepartures.length > 0) {
      upcomingListContainer.innerHTML = remainingDepartures.map(bus => `
        <div class="bus-card">
          <div class="bus-time-group">
            <span class="bus-time">${bus.time} hs</span>
            <span class="bus-line">${bus.company} - ${bus.service}</span>
          </div>
          <div class="bus-badges">
            <span class="badge ${bus.companyBadge}">${bus.via}</span>
          </div>
        </div>
      `).join('');
    } else {
      upcomingListContainer.innerHTML = '';
    }
  }

  // Renderizar planilla de horarios
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
          <td class="time-cell">${row.time} hs ${isNext ? '[PROXIMO]' : ''}</td>
          <td><strong>${row.company}</strong></td>
          <td>${row.service}</td>
          <td>${row.via}</td>
          <td>Próximamente</td>
        </tr>
      `;
    }).join('');
  }

  // Tema claro/oscuro
  function setupTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
      });
    }
  }

  function updateThemeIcon(theme) {
    if (themeToggleBtn) {
      themeToggleBtn.textContent = theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro';
    }
  }
});
