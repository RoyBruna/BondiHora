// Motor de Alarmas y Recordatorios de Viaje para BondiHora

const AlarmEngine = (() => {
  const STORAGE_KEY = 'bondihora_active_alarm';
  let checkInterval = null;

  // Sonido de campana suave usando Web Audio API (sin archivos externos)
  function playChime() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch (e) {
      console.log('AudioContext not allowed yet:', e);
    }
  }

  // Solicitar permiso para notificaciones web
  async function requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
      try {
        await Notification.requestPermission();
      } catch (e) {
        console.log('Notification permission request error:', e);
      }
    }
  }

  // Disparar la notificacion nativa del navegador
  function triggerNotification(alarm) {
    playChime();
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('⏰ ¡Hora de preparar tu viaje!', {
        body: `Tu colectivo de ${alarm.company} (${alarm.route}) sale a las ${alarm.departureTime} hs.`,
        icon: 'assets/colectivo.png'
      });
    }
  }

  // Convertir hora HH:mm a minutos desde medianoche
  function timeToMinutes(timeStr) {
    if (!timeStr) return 0;
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  }

  // Guardar alarma en localStorage
  function setAlarm(alarmData) {
    // alarmData: { company, route, departureTime, offsetMinutes, dateStr }
    const now = new Date();
    const [h, m] = alarmData.departureTime.split(':').map(Number);
    
    // Crear fecha objetivo
    const targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0);
    // Si la hora ya paso hoy, asumir manana
    if (targetDate.getTime() < now.getTime()) {
      targetDate.setDate(targetDate.getDate() + 1);
    }

    const alarmTimeMs = targetDate.getTime() - (alarmData.offsetMinutes * 60 * 1000);

    const alarmRecord = {
      ...alarmData,
      alarmTimeMs: alarmTimeMs,
      targetTimeMs: targetDate.getTime(),
      createdMs: Date.now()
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(alarmRecord));
    requestNotificationPermission();
    startMonitoring();
    return alarmRecord;
  }

  // Obtener alarma activa
  function getActiveAlarm() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return null;
      const alarm = JSON.parse(data);
      // Eliminar si ya pasaron mas de 15 minutos de la hora de la alarma
      if (Date.now() > alarm.alarmTimeMs + (15 * 60 * 1000)) {
        cancelAlarm();
        return null;
      }
      return alarm;
    } catch (e) {
      return null;
    }
  }

  // Cancelar alarma
  function cancelAlarm() {
    localStorage.removeItem(STORAGE_KEY);
  }

  // Verificar periodicamente si debe sonar
  function startMonitoring(onTriggerCallback) {
    if (checkInterval) clearInterval(checkInterval);

    checkInterval = setInterval(() => {
      const alarm = getActiveAlarm();
      if (!alarm) return;

      const nowMs = Date.now();
      if (nowMs >= alarm.alarmTimeMs && !alarm.triggered) {
        alarm.triggered = true;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(alarm));
        triggerNotification(alarm);
        if (typeof onTriggerCallback === 'function') {
          onTriggerCallback(alarm);
        }
      }
    }, 4000);
  }

  return {
    setAlarm,
    getActiveAlarm,
    cancelAlarm,
    startMonitoring,
    playChime,
    requestNotificationPermission
  };
})();
