import React from 'react';

class WeatherDay extends React.Component {
  render() {
    return (
      <li>{this.props.day.time} | {this.props.day.forecast}</li>
    );
  }
}

export default WeatherDay;
