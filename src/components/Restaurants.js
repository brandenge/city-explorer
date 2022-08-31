import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../styles/Restaurants.css'

class Restaurants extends React.Component {
  render() {
    return (
      <>
        <h2>Restaurants</h2>
        <Carousel>{
          this.props.restaurants.map(restaurant => {
            return (
              <Carousel.Item className='wheel' key={restaurant.id}>
                <img className='d-block w-100' src={restaurant.image_url} alt={restaurant.name} />
                <Carousel.Caption>
                  <h3>Name: {restaurant.name} | Rating: {restaurant.rating} | Price: {restaurant.price}</h3>
                  <p>Website: <a href={restaurant.url}>{restaurant.name}'s Website</a></p>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </>
    );
  }
}

export default Restaurants;
