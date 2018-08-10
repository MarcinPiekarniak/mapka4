import initialState from './initialState.js';

export const viewports = (state = initialState.viewports, action) => {
  switch (action.type) {
    case 'VIEWPORT_RESET':
      return {
        ...state,
        currentViewport: JSON.parse(JSON.stringify(state.defaultViewport))
      }
    case 'VIEWPORT_UPDATE':
      return {
        ...state,
        currentViewport: action.viewport
      }
    case 'VIEWPORT_ZOOM_IN':
      state.currentViewport.zoom = state.currentViewport.zoom + 0.5;
      return {
      	...state,
      	currentViewport: state.currentViewport
      }
    case 'VIEWPORT_ZOOM_OUT':
      state.currentViewport.zoom = state.currentViewport.zoom - 0.5;
      return {
      	...state,
      	currentViewport: state.currentViewport
      }
    case 'VIEWPORT_ZOOM':
      state.currentViewport = JSON.parse(JSON.stringify(state.defaultViewport));
      state.currentViewport.latitude = action.coordinates.latitude;
      state.currentViewport.longitude = action.coordinates.longitude;
      state.currentViewport.zoom = 17;
      return {
        ...state,
      }

    default:
      return state
  }
}
