import React, {Component} from 'react';
import DeckGL, {ScatterplotLayer} from 'deck.gl';
import MapLayer from '../../MapLayer.js';
import { connect } from "react-redux";
import { zoomViewport, airportVehiclesFilter } from '../../actions';
import { getFilteredAirportVehicles } from '../../selectors';

class FilterPanel extends Component {
  constructor(props) {
    super(props);
    console.log('start');
    this.state = {
      vehiclesSearch: '',
      displayedVehicles: this.props.airportVehicles,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.airportVehicles != nextProps.airportVehicles) {
      this.setState({
        displayedVehicles: nextProps.airportVehicles.filter(vehicle => {
            const {id, name, type} = vehicle;
            return (
              String(id).toLowerCase().includes(this.state.vehiclesSearch) ||
              name.toLowerCase().includes(this.state.vehiclesSearch) ||
              type.toLowerCase().includes(this.state.vehiclesSearch)
            );
          }),
      });
    }
  }

  zoomTo(index) {
    let coordinates = {
      longitude: this.props.airportVehicles[index].position[0],
      latitude: this.props.airportVehicles[index].position[1],

    }
    this.props.zoomViewport(coordinates);
  }

  handleSearchChange = e => {
    console.log("LOL");
    const displayedVehicles = this.props.airportVehicles.filter(vehicle => {
      const {id, name, type} = vehicle;
      return (
        String(id).toLowerCase().includes(e.currentTarget.value) ||
        name.toLowerCase().includes(e.currentTarget.value) ||
        type.toLowerCase().includes(e.currentTarget.value)
      );
    });
    this.setState({
      displayedVehicles: displayedVehicles,
      vehiclesSearch: e.currentTarget.value
    });
  };

  handleFilterChange = e => {

    this.props.airportVehiclesFilter(e.currentTarget.value);
  };


  render() {
    console.log('woah');
    console.log(this.state);
    return (
      <div className="filterpanel">
        <input
          type="text"
          placeholder="Search..."
          value={this.state.vehiclesSearch}
          onChange={this.handleSearchChange}
        />
        <table>
        <tr><td>id</td><td>name</td><td>type</td></tr>
        {this.state.displayedVehicles.map((x, index) => {
          let zoom = this.zoomTo.bind(this, index);
          return (<tr onClick={zoom}><td>{x.id}</td><td> {x.name}</td><td>{x.type}</td></tr>);
        })}
        </table>
        <input
          type="text"
          placeholder="Filter..."
          value={this.props.vehiclesSearchValue}
          onChange={this.handleFilterChange}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('hahaha');
  console.log(state);
  return {

    airportVehicles: getFilteredAirportVehicles(
        state.airportVehicles.airportVehicles,
        state.airportVehicles.vehiclesSearchValue
      ),
    vehiclesSearchValue: state.airportVehicles.vehiclesSearchValue,
  };
};

const mapDispatchToProps = { zoomViewport, airportVehiclesFilter };

export const FilterPanelContainer = connect(mapStateToProps, mapDispatchToProps)(FilterPanel);


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
