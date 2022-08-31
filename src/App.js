import React from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import Error from './components/Error';
import City from './components/City';
import Weather from './components/Weather';
import Movies from './components/Movies';
import Restaurants from './components/Restaurants';
import './styles/App.css';

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
      movies: [],
      restaurants: []
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
      const cityBaseURL = `https://us1.locationiq.com/v1/search`;
      const cityData = await axios.get(cityBaseURL, { params: {
        key: process.env.REACT_APP_LOCATION_IQ_API_KEY,
        q: this.state.searchQuery,
        format: 'json'
      }});
      this.setState({
        cityData: cityData.data,
        hasError: false,
      }, () => {
        this.getWeather();
        this.getMovies();
        this.getRestaurants();
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
      const weatherBaseURL = `${process.env.REACT_APP_SERVER_URL}/weather`;
      const weatherData = await axios.get(weatherBaseURL, { params: {
        lat: this.state.cityData[0].lat,
        lon: this.state.cityData[0].lon
      }});
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
      const moviesBaseURL = `${process.env.REACT_APP_SERVER_URL}/movies`;
      const moviesData = await axios.get(moviesBaseURL, { params: {
        cityName: this.state.searchQuery
      }});
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

  getRestaurants = async () => {
    try {
      const restaurantsBaseURL = `${process.env.REACT_APP_SERVER_URL}/yelp`;
      const restaurantsData = await axios.get(restaurantsBaseURL, { params: {
        lat: this.state.cityData[0].lat,
        lon: this.state.cityData[0].lon
      }});
      this.setState({
        restaurants: restaurantsData.data,
        hasError: false,
      });
    } catch(error) {
      console.log('Error in getRestaurants', error);
      this.setState({
        hasError: true,
        error: error
      });
    }
  }

  render() {
    return (
      <>
        <SearchBar handleSubmit={this.getCityData} handleInput={this.handleInput}></SearchBar>
        {
          this.state.hasError &&
          <Error error={this.state.error}></Error>
        }
        {
          this.state.cityData.length > 0 &&
          <City
            url={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_API_KEY}&center=${this.state.cityData[0].lat},${this.state.cityData[0].lon}&zoom=10`}
            cityName={this.state.cityData[0].display_name}
            lat={this.state.cityData[0].lat}
            lon={this.state.cityData[0].lon}>
          </City>
        }
        {
          this.state.weatherData.length > 0 &&
            <Weather days={this.state.weatherData}></Weather>
        }
        {
          this.state.restaurants.length > 0 &&
            <Restaurants restaurants={this.state.restaurants}></Restaurants>
        }
        {
          this.state.movies.length > 0 &&
          <Movies movies={this.state.movies}></Movies>
        }
      </>
    );
  }
}

export default App;
