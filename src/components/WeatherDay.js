import React from 'react';

class WeatherDay extends React.Component {
  render() {
    return (
      <li>{this.props.day.date} | {this.props.day.description}</li>
    );
  }
}

export default WeatherDay;
