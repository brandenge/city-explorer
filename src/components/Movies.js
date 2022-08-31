import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../styles/Movies.css'

class Movies extends React.Component {
  render() {
    return (
      <>
        <h2>Movies</h2>
        <Carousel>{
          this.props.movies.map(movie => {
            return (
              <Carousel.Item className='wheel' key={movie.id}>
                <img className='d-block w-100' src={movie.image_url} alt={movie.title} />
                <Carousel.Caption>
                  <h3>Title: {movie.title} | Released: {movie.released_on} | Popularity: {movie.popularity}</h3>
                  <p>Overview: {movie.overview}</p>
                  <p>Total Votes: {movie.total_votes} | Average Votes: {movie.average_votes}</p>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </>
    );
  }
}

export default Movies;
