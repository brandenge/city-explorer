import React from 'react';
import WeatherDay from './WeatherDay'
import Card from 'react-bootstrap/Card';

class Weather extends React.Component {
  render() {
    const weather = this.props.days.map((day, idx) => <WeatherDay day={day} key={idx}></WeatherDay>);
    return (
      <Card className='card'>
        <h2>Weather Forecast</h2>
        <ol>{weather}</ol>
      </Card>
    );
  }
}

export default Weather;
