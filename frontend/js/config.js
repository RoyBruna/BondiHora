// Configuración de la API
// En desarrollo apunta a localhost, en producción apunta al backend desplegado.
// CUANDO TENGAS EL URL DE RENDER, cambiá este valor:
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3000/api'
  : 'https://bondihora.onrender.com/api';
