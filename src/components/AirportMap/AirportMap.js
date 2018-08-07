import React, {Component} from 'react';
import DeckGL, {ScatterplotLayer, IconLayer} from 'deck.gl';
import MapLayer from '../../MapLayer.js';
import { connect } from "react-redux";
import { updateViewport } from '../../actions';
import { getFilteredAirportVehicles } from '../../selectors';
import imageJPG from '../../data/ikonki.svg';

class AirportMap extends Component {
  constructor(props) {
    super(props);
    this.layers = [new MapLayer()];
    this.state = {
      /*tooltip: {
      	x: 0,
      	y: 0,
      	object: null,
      	layer: null
      },
      infowindow: {
      	object: null,
      	layer: null
      },*/
      width: 500,
      height: 500,
	  };
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize.bind(this));

    this._resize();
  }

  componentWillUnmount() {

  }

  _resize() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  render() {
    const { width, height } = this.state;
    let allLayers = this.layers.slice(0);

    console.log('props airportmap');
    console.log(this.props);
    //stairs misc "vacuum truck"

    this.props.airportVehicles.forEach(v => {


      let data = null;
      console.log(v.type);
      if (v.type === "stairs") {
        data = [{position: [ v.position[0], v.position[1] ], icon: 'stairs'}];
      }
      else if (v.type === "misc") {
        data = [{position: [ v.position[0], v.position[1] ], icon: 'misc'}];
      }
      else if (v.type === "vacuum truck") {
        data = [{position: [ v.position[0], v.position[1] ], icon: 'vacuum'}];
      }
      console.log(data);
      let icon = new IconLayer({
          id: `icon-layer-${v.id}`,
          data: data,
          iconAtlas: imageJPG,
          iconMapping:  {
            vacuum: {x: 11, y: 75, width: 28, height: 18, mask: false},
            misc: {x: 8, y: 5, width: 25, height: 18, mask: false},
            stairs: {x: 12, y: 100, width: 20, height: 16, mask: false}
          },
          sizeScale: Math.pow(2, this.props.viewport.zoom - 15),
          getSize: 20,
          opacity: 1,
          fp64: false,
          parameters: {
            depthTest: false
          },
      });

      allLayers.push(icon);

    })
    console.log('ALLLAYERS');
    console.log(allLayers);
/*
    const robotLayer = new IconLayer({
            id: 'icon-layer',
            data: [{position: [ 18.471562507878815, 54.380394488786585 ], icon: 'marker'}],
            iconAtlas: imageJPG,
            iconMapping:  {
              marker: {x: 0, y: 0, width: 259, height: 194, mask: false}
            },
            sizeScale: 1,
            getSize: 400,
            opacity: 1,
            fp64: true
        });
*/

/*
    allLayers.push(new ScatterplotLayer({
      id: "vehicles layer",
      data: this.props.airportVehicles.map(v => ({
        radius: 1,
        color: [70, 70, 255],
        ...v
      })),
      outline: false,
      fp64: true,
      pickable: true,
      transitions: {
      	getPositions: 80
      },
      parameters: {
          depthTest: false
      }
    }));*/
    return (
      <div>
        <DeckGL
          {...this.props.viewport}
          width={width}
          height={height}
          layers={allLayers}
          controller={true}
          onViewStateChange={({viewState}) => {
            this.props.updateViewport(viewState)
          }}
        />

      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log ('WOLOLO');
  console.log(state);
  return {
    airportVehicles: getFilteredAirportVehicles(
        state.airportVehicles.airportVehicles,
        state.airportVehicles.vehiclesSearchValue
      ),
    viewport: state.viewports.currentViewport
  };
};

const mapDispatchToProps = { updateViewport };

export const AirportMapContainer = connect(mapStateToProps, mapDispatchToProps)(AirportMap);


/*
car: {
  lat: 54.3792,
  lng: 18.468
},


this.timerID = setInterval(
  () => this._updateVehiclesPositions(),
  80
);*/
	//clearInterval(this.timerID);

/*
  _updateTooltip(info) {
  	if (info) {
  		const {x, y, object, layer} = info;
		this.setState({tooltip: {x, y, object, layer}});
    } else {
    	this.setState({tooltip: {x: 0, y: 0, object: null, layer: null}});
    }
  }

  _updateInfoWindow(info) {
  	if (info) {
  		const {object, layer} = info;
		this.setState({infowindow: {object, layer}});
    } else {
    	this.setState({infowindow: {object: null, layer: null}});
    }
  }

  _getObjectInfo(object) {
  	return Object.keys(object).map(k => <div key={k}>{k}: {object[k]}</div>);
  }

  _renderTooltip() {
  	const {x, y, object, layer} = this.state.tooltip;

    if (!object || !layer) {
      return null;
    }

  	let info = layer.id === "vehicles layer" ? this._getObjectInfo(object) : this._getObjectInfo(object.properties);

  	return (
      <div className="tooltip"
           style={{left: x, top: y}}>
        {info}
      </div>
    );

  }

  _renderInfoWindow() {
  	const {object, layer} = this.state.infowindow;

    if (!object || !layer) {
      return null;
    }

  	let info = layer.id === "vehicles layer" ? this._getObjectInfo(object) : this._getObjectInfo(object.properties);
  	return (
      <div className="infowindow">
        {info}
      </div>
    );
  }*/
/*
  _updateVehiclesPositions() {
  	this.setState(prevState => {
  		const newVehicles =  prevState.vehicles.map(v => ({
  			position: [
  				v.position[0] + v.speed * Math.cos(v.bearing * Math.PI / 180),
  				v.position[1] + v.speed * Math.sin(v.bearing * Math.PI / 180)
  			],
  			bearing: v.bearing,
  			speed: v.speed,
  			id: v.id
  		}))

  		let newObject = prevState.infowindow.object;
  		if (prevState.infowindow && prevState.infowindow.layer && prevState.infowindow.layer.id === "vehicles layer" && prevState.infowindow.object && prevState.infowindow.object.id) {
  			newObject = newVehicles.filter(v => v.id === prevState.infowindow.object.id).slice(-1)[0];
  			if(!newObject) {
  				newObject = prevState.infowindow.object;
  			}
  		}

  		return {
  			vehicles: newVehicles,
  			infowindow: {
  				...prevState.infowindow,
  				object: newObject
  			}
  		}
  	});
  }*/
