import { resetViewport, zoomInViewport, zoomOutViewport } from '../../actions';
import React, {Component} from 'react';
import { connect } from "react-redux";

export class ViewManager extends Component {

  resetViewport() {
    console.log('woah');
    this.props.resetViewport();
  }

  zoomInViewPort() {
    this.props.zoomInViewport();
  }

  zoomOutViewPort() {
    this.props.zoomOutViewport();
  }

  render() {
    return (
      <div className="viewmanager">
        <button onClick={this.resetViewport.bind(this)}>default</button>
	<br />
	<p>
	   Zoom:  
           <button onClick={this.zoomInViewPort.bind(this)}>+</button>
	   /
	   <button onClick={this.zoomOutViewPort.bind(this)}>-</button>
	</p>
      </div>	
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = { resetViewport, zoomInViewport, zoomOutViewport};

export const ViewManagerContainer = connect(mapStateToProps, mapDispatchToProps)(ViewManager);
