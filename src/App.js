import React from 'react';
import axios from 'axios';
import Weather from './Weather';
import Form from 'react-bootstrap/Form';
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      cityData: [],
      mapSrc: '',
      hasError: false,
      error: {},
      weatherData: [],
      movies: []
    };
  }

  handleInput = (e) => {
    e.preventDefault();
    this.setState({
      searchQuery: e.target.value
    });
  }

  getCityData = async (e) => {
    try {
      e.preventDefault();
      const cityURL = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATION_IQ_API_KEY}&q=${this.state.searchQuery}&format=json`;
      const cityData = await axios.get(cityURL);
      console.log('cityData:', cityData);

      this.setState({
        cityData: cityData.data,
        hasError: false,
      }, () => {
        this.getWeather();
        this.getMovies();
      });
    } catch(error) {
      console.log('Error in getCityData', error);
      this.setState({
        hasError: true,
        error: error
      });
    }
  }

  getWeather = async () => {
    try {
      const weatherURL = `${process.env.REACT_APP_SERVER_URL}/weather?lat=${this.state.cityData[0].lat}&lon=${this.state.cityData[0].lon}`;
      const weatherData = await axios.get(weatherURL);
      console.log('weatherData:', weatherData.data);
      this.setState({
        weatherData: weatherData.data,
        hasError: false,
      });
    } catch(error) {
      console.log('Error in getWeather', error);
      this.setState({
        hasError: true,
        error: error
      });
    }
  }

  getMovies = async () => {
    try {
      const moviesURL = `${process.env.REACT_APP_SERVER_URL}/movies?cityName=${this.state.searchQuery}`;
      const moviesData = await axios.get(moviesURL);
      console.log(moviesData.data);
      this.setState({
        movies: moviesData.data,
        hasError: false,
      });
    } catch(error) {
      console.log('Error in getMovies', error);
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
          this.state.cityData.length > 0 &&
          <Card className='card'>
            <Card.Body>
              <Card.Img className='cardImg' src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_API_KEY}&center=${this.state.cityData[0].lat},${this.state.cityData[0].lon}&zoom=10`}></Card.Img>
              <Card.Title>{this.state.cityData[0].display_name}</Card.Title>
              <Card.Text>Latitude: {this.state.cityData[0].lat} | Longitude: {this.state.cityData[0].lon}</Card.Text>
              <Weather days={this.state.weatherData}></Weather>
            </Card.Body>
          </Card>
        }
        {
          this.state.hasError &&
          <Card className='error'>
          <Card.Body>
            <Card.Title>ERROR</Card.Title>
            <Card.Text>ERROR STATUS CODE: {this.state.error.response.status}</Card.Text>
            <Card.Text>ERROR MESSAGE: {this.state.error.message}</Card.Text>
          </Card.Body>
        </Card>
        }
      </>
    );
  }
}

export default App;
