import React from 'react';
import PropTypes from 'prop-types';
// Bootstrap imports
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
// react-router imports
import { Link } from 'react-router-dom';

import './movie-card.scss';

/**
 * @function MovieCard class component
 * @description Component renders basic movie details compiled from API,
 * including: Movie title, description, and image.
 */
export class MovieCard extends React.Component {
  render() {
    // This is given to the <MovieCard/> component by the outer world
    // Which in this case, is the "MainView", as "MainView" is what's connected to your DB
    // Via the movies endpoint of your API
    const { movie } = this.props;

    return (
      <div className='card-container'>
        <Card className='movie-cards' style={{ width: '18rem' }}>
          <Card.Img variant='top' src={movie.ImagePath} />

          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
            <ListGroup className='card-links'>
              <ListGroup.Item className='card-item'>
                <Link to={`/movies/${movie._id}`}>
                  <Button className='movie-details detail-link' variant='link'>
                    Movie Details
                  </Button>
                </Link>
              </ListGroup.Item>
              <ListGroup.Item className='card-item'>
                <Link to={`/directors/${movie.Director[0].Name}`}>
                  <Button
                    className='director-details detail-link'
                    variant='link btn'
                  >
                    Director Details
                  </Button>
                </Link>
              </ListGroup.Item>
              <ListGroup.Item className='card-item'>
                <Link to={`/genres/${movie.Genre[0].Name}`}>
                  <Button className='genre-details detail-link' variant='link'>
                    Genre Details
                  </Button>
                </Link>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
};
