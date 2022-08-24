import React from 'react';

class Weather extends React.Component {
  render() {
    const weather = this.props.days.map(day => <li>Date: {day.date} | Weather: {day.description}</li>);
    return (
      <ol>
        {weather}
      </ol>
    );
  }
}

export default Weather;
