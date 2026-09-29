document.addEventListener('DOMContentLoaded', async () => {
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

  const success = await window.loadBusData();
  if (success) {
    initApp();
  } else {
    alert("Error de conexión con el servidor. No se pudieron cargar los horarios.");
  }

  function initApp() {
    populateCitySelects();
    setupClock();
    setupTheme();
    setupEventListeners();
    setupAlarmModalListeners();
    renderResults();
    initMap();
    fetchAndRenderAlerts();
    setupChangelog();
    setupPWA();
    setupLanguage();
  }

  function setupLanguage() {
    if (window.i18n) {
      window.i18n.applyTranslations();
      const langBadge = document.getElementById('lang-badge');
      const langText = document.getElementById('lang-text');
      
      // Update text based on current lang
      langText.textContent = window.i18n.currentLang.toUpperCase();

      // Dropdown toggle logic
      langBadge.addEventListener('click', (e) => {
        e.stopPropagation();
        langBadge.classList.toggle('active');
      });

      document.addEventListener('click', () => {
        langBadge.classList.remove('active');
      });

      // Handle language selection
      document.querySelectorAll('.lang-option').forEach(option => {
        option.addEventListener('click', (e) => {
          e.stopPropagation();
          const selectedLang = option.getAttribute('data-lang');
          window.i18n.setLang(selectedLang);
          langText.textContent = selectedLang.toUpperCase();
          langBadge.classList.remove('active');
          
          // Re-render UI elements that might be dynamic
          renderResults();
        });
      });
    }
  }

  let globalAlerts = [];

  function getDismissedAlerts() {
    try {
      return JSON.parse(localStorage.getItem('dismissedAlerts') || '[]');
    } catch {
      return [];
    }
  }

  function dismissAlert(id) {
    const dismissed = getDismissedAlerts();
    if (!dismissed.includes(id)) {
      dismissed.push(id);
      localStorage.setItem('dismissedAlerts', JSON.stringify(dismissed));
    }
    const card = document.getElementById(`alert-card-${id}`);
    if (card) card.remove();
  }
  
  window.dismissAlert = dismissAlert;

  async function fetchAndRenderAlerts() {
    try {
      const res = await fetch(API_BASE_URL + '/alerts');
      if (!res.ok) return;
      globalAlerts = await res.json();
      
      const container = document.getElementById('live-alerts-container');
      if (!container) return;
      
      container.innerHTML = '';
      const dismissed = getDismissedAlerts();
      
      const styles = {
        gray: { border: 'border-slate-500', icon: 'ℹ️', text: 'text-slate-500', bg: 'bg-white dark:bg-slate-900' },
        green: { border: 'border-emerald-500', icon: '✅', text: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
        yellow: { border: 'border-amber-500', icon: '⚠️', text: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/30' },
        red: { border: 'border-red-500', icon: '🚨', text: 'text-red-500', bg: 'bg-red-50 dark:bg-red-950/30' }
      };
      
      globalAlerts.forEach(alert => {
        if (dismissed.includes(alert.id)) return; 
        
        const severityConfig = {
          red: {
            tag: 'var(--color-red-tag)',
            title: 'var(--color-red-title)',
            detail: 'var(--color-red-detail)',
            bg: 'var(--color-red-bg)',
            accent: '#dc2626',
            icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`
          },
          yellow: {
            tag: 'var(--color-yellow-tag)',
            title: 'var(--color-yellow-title)',
            detail: 'var(--color-yellow-detail)',
            bg: 'var(--color-yellow-bg)',
            accent: '#d97706',
            icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
          },
          green: {
            tag: 'var(--color-green-tag)',
            title: 'var(--color-green-title)',
            detail: 'var(--color-green-detail)',
            bg: 'var(--color-green-bg)',
            accent: '#16a34a',
            icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
          },
          gray: {
            tag: 'var(--color-gray-tag)',
            title: 'var(--color-gray-title)',
            detail: 'var(--color-gray-detail)',
            bg: 'var(--color-gray-bg)',
            accent: '#64748b',
            icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`
          }
        };
        
        const cfg = severityConfig[alert.severity] || severityConfig.gray;
        const div = document.createElement('div');
        div.id = `alert-card-${alert.id}`;
        div.style.cssText = `background: ${cfg.bg}; border-left: 3px solid ${cfg.accent}; padding: 0.85rem 1rem; position: relative; border-radius: 4px; box-shadow: 0 4px 16px rgba(0,0,0,0.12); transition: all 0.3s;`;
        div.innerHTML = `
          <button onclick="window.dismissAlert(${alert.id})" style="position: absolute; top: 8px; right: 10px; background: none; border: none; cursor: pointer; color: ${cfg.detail}; font-size: 1rem; line-height: 1; opacity: 0.6;" title="Cerrar">&times;</button>
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px; color: ${cfg.accent};">
            ${cfg.icon}
            <span style="font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: ${cfg.tag};">${alert.tag}</span>
          </div>
          <p style="font-size: 0.88rem; font-weight: 700; color: ${cfg.title}; margin: 0 0 2px; padding-right: 1rem;">${alert.title}</p>
          <p style="font-size: 0.78rem; color: ${cfg.detail}; margin: 0;">${alert.detail}</p>
        `;
        container.appendChild(div);
      });
    } catch (e) {
      console.warn("No se pudieron cargar las alertas en vivo.");
    }
  }

  async function fetchWeather() {
    try {
      const res = await fetch(API_BASE_URL + '/weather');
      if (!res.ok) return;
      const data = await res.json();
      
      const badge = document.getElementById('weather-badge');
      const text = document.getElementById('weather-text');
      const iconSvg = document.getElementById('weather-icon-svg');
      
      if (badge && text && iconSvg && data && data.temp !== '--') {
        text.textContent = `${data.temp}°`;
        badge.title = `Clima en la región: ${data.condition}`;
        
        const code = data.iconId || '';
        let svgPath = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
        
        if (code.includes('02') || code.includes('03') || code.includes('04')) {
          svgPath = '<path d="M17.5 19H9a7 7 0 1 1 6.71-9.9 4.5 4.5 0 1 1 1.79 8.9z"></path>';
        } else if (code.includes('09') || code.includes('10')) {
          svgPath = '<path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path><path d="M16 14v6"></path><path d="M8 14v6"></path><path d="M12 16v6"></path>';
        } else if (code.includes('11')) {
          svgPath = '<path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"></path><polyline points="13 11 9 17 15 17 11 23"></polyline>';
        } else if (code.includes('13')) {
          svgPath = '<path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"></path><line x1="8" y1="16" x2="8.01" y2="16"></line><line x1="8" y1="20" x2="8.01" y2="20"></line><line x1="12" y1="18" x2="12.01" y2="18"></line><line x1="12" y1="22" x2="12.01" y2="22"></line><line x1="16" y1="16" x2="16.01" y2="16"></line><line x1="16" y1="20" x2="16.01" y2="20"></line>';
        } else if (code.includes('50')) {
          svgPath = '<line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line>';
        } else if (code.includes('01') && code.includes('n')) {
          svgPath = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
        }
        
        iconSvg.innerHTML = svgPath;
        badge.style.display = 'flex';
      }
    } catch (e) {
      console.warn("No se pudo cargar el clima.");
    }
  }

  function setupChangelog() {
    const btnChangelog = document.getElementById('btn-changelog');
    const modal = document.getElementById('changelog-modal');
    const btnClose = document.getElementById('close-changelog-modal');
    const historyContainer = document.getElementById('changelog-history-container');

    if (!btnChangelog || !modal) return;

    function renderHistory() {
      historyContainer.innerHTML = '';
      if (globalAlerts.length === 0) {
        historyContainer.innerHTML = '<p class="text-center text-slate-500 my-4">No hay novedades registradas.</p>';
        return;
      }
      
      const severityConfig = {
        red: {
          tag: 'var(--color-red-tag)',
          title: 'var(--color-red-title)',
          detail: 'var(--color-red-detail)',
          bg: 'var(--color-red-bg)',
          accent: '#dc2626',
          icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: #dc2626"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`
        },
        yellow: {
          tag: 'var(--color-yellow-tag)',
          title: 'var(--color-yellow-title)',
          detail: 'var(--color-yellow-detail)',
          bg: 'var(--color-yellow-bg)',
          accent: '#d97706',
          icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #d97706"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
        },
        green: {
          tag: 'var(--color-green-tag)',
          title: 'var(--color-green-title)',
          detail: 'var(--color-green-detail)',
          bg: 'var(--color-green-bg)',
          accent: '#16a34a',
          icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #16a34a"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
        },
        gray: {
          tag: 'var(--color-gray-tag)',
          title: 'var(--color-gray-title)',
          detail: 'var(--color-gray-detail)',
          bg: 'var(--color-gray-bg)',
          accent: '#64748b',
          icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #64748b"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`
        }
      };

      globalAlerts.forEach(alert => {
        const cfg = severityConfig[alert.severity] || severityConfig.gray;
        const div = document.createElement('div');
        div.style.cssText = `background: ${cfg.bg}; border-left: 3px solid ${cfg.accent}; padding: 0.85rem 1rem; margin-bottom: 0.75rem; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.07);`;
        div.innerHTML = `
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 5px;">
            ${cfg.icon}
            <span style="font-size: 0.68rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.07em; color: ${cfg.tag};">${alert.tag}</span>
            <span style="font-size: 0.68rem; color: ${cfg.detail}; margin-left: auto; opacity: 0.75;">${new Date(alert.createdAt).toLocaleString()}</span>
          </div>
          <p style="font-size: 0.9rem; font-weight: 700; color: ${cfg.title}; margin: 0 0 3px;">${alert.title}</p>
          <p style="font-size: 0.8rem; color: ${cfg.detail}; margin: 0; line-height: 1.5;">${alert.detail}</p>
        `;
        historyContainer.appendChild(div);
      });
    }

    btnChangelog.addEventListener('click', () => {
      renderHistory();
      modal.style.display = 'flex';
    });

    if (btnClose) {
      btnClose.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
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
    let currentDirection = 'outgoing';
    let currentQuickDest = 'mendoza';

    const dirOutgoingBtn = document.getElementById('dir-outgoing');
    const dirIncomingBtn = document.getElementById('dir-incoming');
    const quickDestGrid = document.getElementById('quick-dest-grid');
    const quickDestLabel = document.getElementById('quick-dest-label');

    function updateQuickSelection() {
      if (currentDirection === 'incoming' && currentQuickDest === 'rim11') {
        currentQuickDest = 'mendoza';
      }

      if (currentDirection === 'outgoing') {
        selectOrigin.value = 'tupungato';
        selectDestination.value = currentQuickDest;
        if (quickDestLabel) quickDestLabel.textContent = 'SELECCIONÁ TU DESTINO (HACIA DÓNDE VAS):';
      } else {
        selectOrigin.value = currentQuickDest;
        selectDestination.value = 'tupungato';
        if (quickDestLabel) quickDestLabel.textContent = 'SELECCIONÁ TU ORIGEN (DESDE DÓNDE VUELVES A TUPUNGATO):';
      }

      if (dirOutgoingBtn && dirIncomingBtn) {
        if (currentDirection === 'outgoing') {
          dirOutgoingBtn.classList.add('active');
          dirIncomingBtn.classList.remove('active');
        } else {
          dirIncomingBtn.classList.add('active');
          dirOutgoingBtn.classList.remove('active');
        }
      }

      if (quickDestGrid) {
        const cards = quickDestGrid.querySelectorAll('.dest-card');
        cards.forEach(card => {
          const isLocalLoop = card.classList.contains('dest-card-local') || card.dataset.dest === 'rim11';
          if (currentDirection === 'incoming' && isLocalLoop) {
            card.style.display = 'none';
          } else {
            card.style.display = 'block';
          }

          if (card.dataset.dest === currentQuickDest) {
            card.classList.add('active');
          } else {
            card.classList.remove('active');
          }
        });
      }

      renderResults();
    }

    if (dirOutgoingBtn && dirIncomingBtn) {
      dirOutgoingBtn.addEventListener('click', () => {
        currentDirection = 'outgoing';
        updateQuickSelection();
      });

      dirIncomingBtn.addEventListener('click', () => {
        currentDirection = 'incoming';
        updateQuickSelection();
      });
    }

    if (quickDestGrid) {
      const cards = quickDestGrid.querySelectorAll('.dest-card');
      cards.forEach(card => {
        card.addEventListener('click', () => {
          currentQuickDest = card.dataset.dest;
          updateQuickSelection();
        });
      });
    }

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
    
    const btnDownloadImg = document.getElementById('btn-download-img');
    if (btnDownloadImg) {
      btnDownloadImg.addEventListener('click', async () => {
        const tableWrapper = document.querySelector('.timetable-container');
        const innerWrapper = document.querySelector('.table-wrapper');
        if (!tableWrapper || !innerWrapper) return;
        
        // Agregar marca de agua temporal repetida
        const watermark = document.createElement('div');
        watermark.style.position = 'absolute';
        watermark.style.top = '0';
        watermark.style.left = '0';
        watermark.style.width = '100%';
        watermark.style.height = '100%';
        watermark.style.backgroundImage = 'url("assets/Titulo-Bondihora.png")';
        watermark.style.backgroundRepeat = 'repeat';
        watermark.style.backgroundSize = '300px';
        watermark.style.opacity = '0.06';
        watermark.style.pointerEvents = 'none';
        watermark.style.zIndex = '0';
        
        // Guardar estilos originales
        const originalPos = tableWrapper.style.position;
        const originalBg = tableWrapper.style.backgroundColor;
        const originalWidth = tableWrapper.style.width;
        const originalMaxWidth = tableWrapper.style.maxWidth;
        const originalInnerOverflow = innerWrapper.style.overflow;
        const originalInnerWidth = innerWrapper.style.width;
        
        // Forzar ancho completo para evitar recortes en pantallas chicas (scroll horizontal)
        const fullWidth = innerWrapper.scrollWidth;
        tableWrapper.style.position = 'relative';
        tableWrapper.style.backgroundColor = 'var(--surface-card)';
        tableWrapper.style.width = (fullWidth + 30) + 'px';
        tableWrapper.style.maxWidth = 'none';
        
        innerWrapper.style.overflow = 'visible';
        innerWrapper.style.width = fullWidth + 'px';
        
        // Ajustar tema oscuro a claro para impresion
        const isDark = document.body.classList.contains('dark-theme');
        if (isDark) {
          document.body.classList.remove('dark-theme');
        }
        
        tableWrapper.appendChild(watermark);

        // Cambiar texto de boton por feedback
        const originalBtnHTML = btnDownloadImg.innerHTML;
        btnDownloadImg.innerHTML = 'Generando...';
        
        try {
          if (!window.html2canvas) throw new Error("html2canvas no cargó");
          // Darle tiempo al navegador a re-renderizar la tabla expandida
          await new Promise(r => setTimeout(r, 200));
          
          const canvas = await window.html2canvas(tableWrapper, { 
            scale: 2, 
            backgroundColor: '#ffffff'
          });
          const imgUrl = canvas.toDataURL('image/png');
          
          const a = document.createElement('a');
          a.href = imgUrl;
          a.download = `Planilla-BondiHora-${new Date().toLocaleDateString('es-AR').replace(/\//g, '-')}.png`;
          a.click();
        } catch (e) {
          console.error('Error generando imagen:', e);
          alert('Hubo un error al generar la imagen. Intenta de nuevo.');
        } finally {
          tableWrapper.removeChild(watermark);
          tableWrapper.style.position = originalPos;
          tableWrapper.style.backgroundColor = originalBg;
          tableWrapper.style.width = originalWidth;
          tableWrapper.style.maxWidth = originalMaxWidth;
          innerWrapper.style.overflow = originalInnerOverflow;
          innerWrapper.style.width = originalInnerWidth;
          
          btnDownloadImg.innerHTML = originalBtnHTML;
          if (isDark) document.body.classList.add('dark-theme');
        }
      });
    }

    updateQuickSelection();
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
            <span class="next-service-badge">Próxima Salida</span>
          </div>
          <span class="duration-badge">${nextBus.duration} aprox</span>
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
            <button class="btn-alarm-trigger icon-only" data-time="${nextBus.time}" data-company="${nextBus.company}" data-route="${originName} → ${destName} (${nextBus.via})" title="Programar alarma para las ${nextBus.time} hs" aria-label="Programar alarma"><svg class="alarm-svg-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><path d="M5 3L2 6"/><path d="M19 3l3 3"/></svg></button>
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
            <span class="meta-pill">${bus.duration}</span>
            <span class="price-pill">${bus.price}</span>
            <button class="btn-alarm-trigger icon-only" data-time="${bus.time}" data-company="${bus.company}" data-route="${originName} → ${destName} (${bus.via})" title="Programar alarma para las ${bus.time} hs" aria-label="Programar alarma"><svg class="alarm-svg-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><path d="M5 3L2 6"/><path d="M19 3l3 3"/></svg></button>
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
          <td><strong>${row.via}</strong></td>
          <td>${row.service}</td>
          <td>${row.company}</td>
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

    const isDark = currentTheme === 'dark';
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

    mapTileLayer = L.tileLayer(tileUrl, {
      attribution: attribution,
      maxZoom: 19,
      className: isDark ? 'dark-map-tiles' : ''
    }).addTo(mapInstance);

    if (!document.getElementById('dark-map-css')) {
      const style = document.createElement('style');
      style.id = 'dark-map-css';
      style.textContent = '.dark-map-tiles { filter: brightness(0.6) invert(1) contrast(3) hue-rotate(200deg) saturate(0.3) brightness(0.7); }';
      document.head.appendChild(style);
    }

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
        html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="28" height="42">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 24 12 24S24 21 24 12C24 5.373 18.627 0 12 0z" fill="#3b82f6" stroke="#1d4ed8" stroke-width="1"/>
          <circle cx="12" cy="12" r="5" fill="white" opacity="0.95"/>
        </svg>`,
        iconSize: [28, 42],
        iconAnchor: [14, 42],
        popupAnchor: [0, -44]
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

  async function fetchWeather() {
    try {
      const res = await fetch(API_BASE_URL + '/weather');
      if (!res.ok) return;
      const data = await res.json();
      
      const badge = document.getElementById('weather-badge');
      const text = document.getElementById('weather-text');
      const iconSvg = document.getElementById('weather-icon-svg');
      
      if (badge && text && iconSvg && data && data.temp !== '--') {
        text.textContent = `${data.temp}°`;
        badge.title = `Clima en la región: ${data.condition}`;
        
        const code = data.iconId || '';
        let svgPath = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
        let tomorrowSvgPath = svgPath;
        
        const getIconPath = (iconCode) => {
          if (iconCode.includes('02') || iconCode.includes('03') || iconCode.includes('04')) return '<path d="M17.5 19H9a7 7 0 1 1 6.71-9.9 4.5 4.5 0 1 1 1.79 8.9z"></path>';
          if (iconCode.includes('09') || iconCode.includes('10')) return '<path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path><path d="M16 14v6"></path><path d="M8 14v6"></path><path d="M12 16v6"></path>';
          if (iconCode.includes('11')) return '<path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"></path><polyline points="13 11 9 17 15 17 11 23"></polyline>';
          if (iconCode.includes('13')) return '<path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"></path><line x1="8" y1="16" x2="8.01" y2="16"></line><line x1="8" y1="20" x2="8.01" y2="20"></line><line x1="12" y1="18" x2="12.01" y2="18"></line><line x1="12" y1="22" x2="12.01" y2="22"></line><line x1="16" y1="16" x2="16.01" y2="16"></line><line x1="16" y1="20" x2="16.01" y2="20"></line>';
          if (iconCode.includes('50')) return '<line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line>';
          if (iconCode.includes('01') && iconCode.includes('n')) return '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
          return '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
        };
        
        iconSvg.innerHTML = getIconPath(code);
        badge.style.display = 'flex';
        
        // Render popup
        const popup = document.getElementById('weather-popup');
        if (popup) {
          const tom = data.tomorrow;
          let tomorrowHtml = '';
          if (tom) {
            tomorrowHtml = `
              <div class="weather-popup-divider"></div>
              <div class="weather-popup-tomorrow">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-500">${getIconPath(tom.iconId)}</svg>
                <span><strong>Mañana:</strong> ${tom.max}° / ${tom.min}° - <span style="text-transform: capitalize;">${tom.condition}</span></span>
              </div>
            `;
          }
          
          popup.innerHTML = `
            <div class="weather-popup-header">
              <span>Clima Actual</span>
              <span>${data.temp}°</span>
            </div>
            <div class="weather-popup-body">
              <div><strong style="color: var(--neutral-900);">Sensación térmica:</strong> ${data.feelsLike}°</div>
              <div><strong style="color: var(--neutral-900);">Humedad:</strong> ${data.humidity}%</div>
              <div><strong style="color: var(--neutral-900);">Viento:</strong> ${data.wind} km/h</div>
              <div style="text-transform: capitalize; margin-top: 0.2rem;">${data.condition} (Máx ${data.max}° / Mín ${data.min}°)</div>
            </div>
            ${tomorrowHtml}
          `;
          
          // Click toggle behavior for mobile or sticky
          badge.addEventListener('click', (e) => {
            e.stopPropagation();
            badge.classList.toggle('active');
          });
          document.addEventListener('click', () => badge.classList.remove('active'));
        }
      }
    } catch (e) {
      console.warn("No se pudo cargar el clima.");
    }
  }

  fetchWeather();
  setInterval(fetchWeather, 600000);

  function setupPWA() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }

    const closeBtn = document.getElementById('btn-close-app');
    if (closeBtn) {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
      if (isStandalone) {
        closeBtn.style.display = 'flex';
        closeBtn.addEventListener('click', () => window.close());
      }
    }

    if ('Notification' in window && Notification.permission === 'default') {
      setTimeout(() => {
        const hasCriticalAlerts = globalAlerts.some(a => a.severity === 'red' || a.severity === 'yellow');
        if (hasCriticalAlerts) {
          Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
              globalAlerts
                .filter(a => a.severity === 'red' || a.severity === 'yellow')
                .forEach(alert => {
                  new Notification(`${alert.tag} — ${alert.title}`, {
                    body: alert.detail,
                    icon: '/assets/icon-192.png',
                    tag: `alert-${alert.id}`
                  });
                });
            }
          });
        }
      }, 3000);
    }
  }

});
