const initialState = {
  viewports: {
    defaultViewport: {
      latitude: 54.3792,
      longitude: 18.468,
      zoom: 16,
      bearing: 24,
      pitch: 20,
    },
    currentViewport: {
      latitude: 54.3792,
      longitude: 18.468,
      zoom: 16,
      bearing: 24,
      pitch: 20,
    }
  },
  airportVehicles: {
    airportVehicles: [],
    vehiclesSearchValue: '',
  }
};

export default initialState;
