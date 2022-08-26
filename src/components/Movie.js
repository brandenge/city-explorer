import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

class Movie extends React.Component {
  render() {
    return (
      <Carousel.Item className='wheel'>
        <img className='d-block w-100' src={this.props.movie.image_url} alt={this.props.movie.title} />
        <Carousel.Caption>
          <h3>Title: {this.props.movie.title} | Released: {this.props.movie.released_on} | Popularity: {this.props.movie.popularity}</h3>
          <p>Overview: {this.props.movie.overview}</p>
          <p>Total Votes: {this.props.movie.total_votes} | Average Votes: {this.props.movie.average_votes}</p>
        </Carousel.Caption>
      </Carousel.Item>
    );
  }
}

export default Movie;
