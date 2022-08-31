import React from 'react';
import Card from 'react-bootstrap/Card';

class Error extends React.Component {
  render() {
    return (
      <Card className='error'>
        <Card.Body>
          <Card.Title>ERROR</Card.Title>
          <Card.Text>ERROR STATUS CODE: {this.props.error.status}</Card.Text>
          <Card.Text>ERROR MESSAGE: {this.props.error.message}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default Error;
