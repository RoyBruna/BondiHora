window.BUS_DATA = {
  cities: [],
  companies: {},
  routes: []
};

window.loadBusData = async function() {
  try {
    const response = await fetch(API_BASE_URL + '/data');
    if (!response.ok) throw new Error('Error al conectar con la API');
    const data = await response.json();
    
    if (data.error === 'Sin conexión') throw new Error('Offline');

    window.BUS_DATA.cities = data.cities;
    window.BUS_DATA.companies = data.companies;
    window.BUS_DATA.routes = data.routes;
    
    localStorage.setItem('bondihora_offline_data', JSON.stringify(data));
    return true;
  } catch (error) {
    console.warn('Usando datos offline:', error);
    const offlineData = localStorage.getItem('bondihora_offline_data');
    if (offlineData) {
      try {
        const data = JSON.parse(offlineData);
        window.BUS_DATA.cities = data.cities;
        window.BUS_DATA.companies = data.companies;
        window.BUS_DATA.routes = data.routes;
        return true;
      } catch (e) {
        return false;
      }
    }
    return false;
  }
};
