import React, {Component} from 'react';

export class TimeBox extends Component{
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  
  render() {
    const UTCStringDate = (this.state.date.toISOString()).substring(0, 19).replace('T', ' ').replace('-','/').replace('-','/');
    return (
      <div className="timebox">
      	<h2>{UTCStringDate}</h2>
      </div>	
    );
  }
};


export const TimeBoxContainer = (TimeBox);
