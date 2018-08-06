import { combineReducers } from "redux";
import { airportVehicles } from "./airportVehicles";
import { viewports } from "./viewports";


export default combineReducers({
  airportVehicles,
  viewports
});
