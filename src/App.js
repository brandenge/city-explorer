import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: [],
      mapSrc: '',
      hasError: false,
      error: {}
    };
  }

  handleInput = (e) => {
    e.preventDefault();
    this.setState({
      city: e.target.value
    });
  }

  getCityData = async (e) => {
    e.preventDefault();
    try {
      const url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATION_IQ_API_KEY}&q=${this.state.city}&format=json`;
      const cityData = await axios.get(url);
      this.setState({
        cityData: cityData.data,
        hasError: false
      });
    } catch(error) {
      console.log(error);
      this.setState({
        hasError: true,
        error: error
      });
    }
  }

  render() {
    return (
      <>
        <Form className='form' onSubmit={this.getCityData}>
          <InputGroup className='input' size='lg'>
            <InputGroup.Text id="inputGroup-sizing-lg">
              Enter the name of a U.S. city:
            </InputGroup.Text>
            <Form.Control onInput={this.handleInput}/>
          </InputGroup>
          <Button className='button' variant='outline-secondary' id='button-addon2' type='submit'>
            Explore!
          </Button>
        </Form>
        {
          this.state.hasError && <Card className='error'>
          <Card.Body>
            <Card.Title>ERROR</Card.Title>
            <Card.Text>ERROR STATUS CODE: {this.state.error.response.status}</Card.Text>
            <Card.Text>ERROR MESSAGE: {this.state.error.message}</Card.Text>
          </Card.Body>
        </Card>
        }
        {
          this.state.cityData.length > 0 &&
          <Card className='card'>
            <Card.Body>
              <Card.Img className='cardImg' src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_API_KEY}&center=${this.state.cityData[0].lat},${this.state.cityData[0].lon}&zoom=10`}></Card.Img>
              <Card.Title>{this.state.cityData[0].display_name}</Card.Title>
              <Card.Text>Latitude: {this.state.cityData[0].lat}</Card.Text>
              <Card.Text>Longitude: {this.state.cityData[0].lon}</Card.Text>
            </Card.Body>
          </Card>
        }
      </>
    );
  }
}

export default App;
