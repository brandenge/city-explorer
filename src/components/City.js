import React from 'react';
import Card from 'react-bootstrap/Card';

class City extends React.Component {
  render() {
    return (
      <Card className='card'>
        <Card.Body>
          <Card.Img className='cardImg' src={this.props.url}></Card.Img>
          <Card.Title>{this.props.cityName}</Card.Title>
          <Card.Text>Latitude: {this.props.lat} | Longitude: {this.props.lon}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default City;
