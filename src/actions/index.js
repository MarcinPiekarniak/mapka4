export const airportVehiclesLoaded = (airportVehicles) => ({
  type: 'LOAD_AIRPORT_VEHICLES_SUCCESS',
  airportVehicles
});

export const airportVehiclesUpdate = (airportVehicles) => ({
  type: 'UPDATE_AIRPORT_VEHICLES',
  airportVehicles
});


export const airportVehiclesFilter = (vehiclesSearchValue) => ({
  type: 'FILTER_AIRPORT_VEHICLES',
  vehiclesSearchValue
});

export const resetViewport = () => ({
  type: 'VIEWPORT_RESET',
});

export const updateViewport = (viewport) => ({
  type: 'VIEWPORT_UPDATE',
  viewport
});

export const zoomInViewport = () => ({
  type: 'VIEWPORT_ZOOM_IN',
});

export const zoomOutViewport = () => ({
  type: 'VIEWPORT_ZOOM_OUT',
});

export const zoomViewport = (coordinates) => ({
  type: 'VIEWPORT_ZOOM',
  coordinates
});
