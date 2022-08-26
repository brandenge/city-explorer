import React from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import Error from './components/Error';
import City from './components/City';
import Weather from './components/Weather';
import Movies from './components/Movies';
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
          this.state.movies.length > 0 &&
          <Movies movies={this.state.movies}></Movies>
        }
      </>
    );
  }
}

export default App;
