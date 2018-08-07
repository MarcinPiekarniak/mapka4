import initialState from './initialState.js';

export const airportVehicles = (state = initialState.airportVehicles, action) => {
  switch (action.type) {
    case 'LOAD_AIRPORT_VEHICLES_SUCCESS':
      return {
        ...state,
        airportVehicles: action.airportVehicles,
      }
      
    case 'UPDATE_AIRPORT_VEHICLES':
      return {
        ...state,
        airportVehicles: action.airportVehicles,
      }

    case 'FILTER_AIRPORT_VEHICLES':
      return {
        ...state,
        vehiclesSearchValue: action.vehiclesSearchValue,
      }

    default:
      return state
  }
}
