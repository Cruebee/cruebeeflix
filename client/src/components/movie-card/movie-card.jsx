import React from 'react';
import PropTypes from 'prop-types';
// Bootstrap imports
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
// react-router imports
import { Link } from 'react-router-dom';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    // This is given to the <MovieCard/> component by the outer world
    // Which in this case, is the "MainView", as "MainView" is what's connected to your DB
    // Via the movies endpoint of your API
    const { movie } = this.props;

    return (
      <Card className="movie-cards" style={{ width: "16rem" }}>
        <Card.Img variant="top" src={movie.ImagePath} />

        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <ListGroup className="card-links">
            <ListGroup.Item>
              <Link to={`/movies/${movie._id}`}>
                <Button
                  className="movie-details"
                  variant="link"
                >
                  Movie Details
              </Button>
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link to={`/directors/${movie.Director[0].Name}`}>
                <Button
                  className="director-details"
                  variant="link"
                >
                  Director Details
                  </Button>
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link to={`/genres/${movie.Genre[0].Name}`}>
                <Button
                  className="genre-details"
                  variant="link"
                >
                  Genre Details
                  </Button>
              </Link>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
