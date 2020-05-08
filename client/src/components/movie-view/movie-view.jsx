import React from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
// React-Bootstrap imports
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
// react-router imports
import { Link } from 'react-router-dom';

import './movie-view.scss';

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  addFavoriteMovie(e, movie) {
    e.preventDefault();
    let username = localStorage.getItem('user');
    let token = localStorage.getItem('token');
    Axios({
      method: 'post',
      url: `https://cruebeeflix.herokuapp.com/users/${username}/movies/${movie._id}`,
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(response => {
        alert(`${movie.Title} was added to your favorite movies!`)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movie } = this.props;
    var featured = '';

    if (!movie) return null;

    if (movie.Featured) {
      featured = 'Yes';
    } else {
      featured = 'No';
    }

    return (
      <Card className="movie-view" style={{ width: '20rem' }}>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Text className="movie-description"><span className="label">Title: </span>{movie.Description}</Card.Text>
        <ListGroup className="details">
          <ListGroup.Item className="details"><span className="label">Genre: </span>{movie.Genre[0].Name}</ListGroup.Item>
          <ListGroup.Item className="details"><span className="label">Director: </span>{movie.Director[0].Name}</ListGroup.Item>
          <ListGroup.Item className="details"><span className="label">Featured: </span>{featured}</ListGroup.Item>
        </ListGroup>
        <div className="favorites-container">
          <Button
            variant="btn"
            className="favorite-button"
            onClick={(e) => this.addFavoriteMovie(e, movie)}
          >
            Add To Favorites
            </Button>
        </div>
        <div className="return-section">
          <Link to={`/client`}>
            <Button
              variant="btn"
              className="back-button"
            >
              Back
            </Button>
          </Link>
        </div>
      </Card>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
