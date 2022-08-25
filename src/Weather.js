import React from 'react';
import Card from 'react-bootstrap/Card';

class Weather extends React.Component {
  render() {
    const weather = this.props.days.map((day, i) => <li key={i}>Date: {day.date} | Weather: {day.description}</li>);
    return (
      <Card className='card'>
        <h2>Weather Forecast</h2>
        <ol>{weather}</ol>
      </Card>
    );
  }
}

export default Weather;
