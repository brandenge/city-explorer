import React from 'react';

class Weather extends React.Component {
  render() {
    const weather = this.props.days.map((day, i) => <li key={i}>Date: {day.date} | Weather: {day.description}</li>);
    return (
      <ol>
        {weather}
      </ol>
    );
  }
}

export default Weather;
