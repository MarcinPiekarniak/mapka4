import {GeoJsonLayer} from 'deck.gl';
import airportGeojson from './data/airport_geojson.js';

const LIGHT_SETTINGS = {
  lightsPosition: [18, 54, 5000, 19, 55, 8000],
  ambientRatio: 0.2,
  diffuseRatio: 0.5,
  specularRatio: 0.3,
  lightsStrength: [1.0, 0.0, 2.0, 0.0],
  numberOfLights: 2
};

const colors = [
	[75, 178, 59],
	[168, 168, 168],
	[151, 151, 151],
	[48, 48, 48],
	[255, 255, 255],
	[255, 255, 255],
	[92, 92, 92],
	[92, 92, 92],
	[255, 255, 255],
	[255, 255, 255],
	[255, 255, 255],
	[255, 255, 255],
	[255, 255, 255],
	[100, 255, 100],
	[95, 95, 95],
	[10, 10, 10],
	[255, 228, 0],
	[144, 193, 242],
	[188, 190, 155],
	[255, 228, 0],
	[255, 228, 0],
	[255, 228, 0],
	[255, 228, 0],
	[255, 228, 0],
	[255, 255, 255],
	[100, 10, 10],
	[204, 0, 3],
	[255, 255, 255],
];

function extractId(str) {
	let id = '';
	for (let i = 0; i < str.length; ++i) {
		if (str[i] === '_') break;
		id += str[i];
	}
	return parseInt(id);
}


export default class MapLayer extends GeoJsonLayer {
	static layerName = 'MapLayer'

	constructor(props) {
    super({
      id: 'airport-geojson',
      data: airportGeojson,
      opacity: 1,
      stroked: false,
      filled: true,
      extruded: false,
      pickable: false,
      fp64: true,
      getElevation: f => 0,
      getFillColor: f => {
				return colors[extractId(f.properties.id)];
			},
      getLineColor: f => {
				return colors[extractId(f.properties.id)];
			},
			parameters: {
        depthTest: false
			},
      lightSettings: LIGHT_SETTINGS,
    })
	}
}
