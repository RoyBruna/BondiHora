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
    window.BUS_DATA.cities = data.cities;
    window.BUS_DATA.companies = data.companies;
    window.BUS_DATA.routes = data.routes;
    return true;
  } catch (error) {
    console.error('Error cargando datos del servidor:', error);
    return false;
  }
};
