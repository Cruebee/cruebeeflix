import React from 'react';
import PropTypes, { arrayOf } from 'prop-types';
import Axios from 'axios';
// React-Bootstrap imports
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// react-router imports
import { Link } from 'react-router-dom';
// import scss
import './movie-view.scss';

/**
 * @function MovieView class Component
 * @description Component renders Full movie details, button to add to favorites,
 * and links to Genre and Director views
 */
export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  /**
   * @function Add movie to favorites list
   * @param {event} e event triggering addition of movie (onclick)
   * @param {MovieID} movie movieID to be added to favorites list
   * @returns {string} string/notification indicating movie was added to list
   */
  addFavoriteMovie(e, movie) {
    e.preventDefault();
    let username = localStorage.getItem('user');
    let token = localStorage.getItem('token');
    Axios({
      method: 'post',
      url: `https://cruebeeflix.herokuapp.com/users/${username}/movies/${movie._id}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        alert(`${movie.Title} was added to your favorite movies!`);
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
      <Card className='movie-view' style={{ width: '18rem' }}>
        <Card.Img variant='top' src={movie.ImagePath} />
        <Card.Text className='details'>
          <span className='label'>Title: </span>
          {movie.Title}
        </Card.Text>
        <Card.Text className='details'>
          <span className='label'>Description: </span>
          {movie.Description}
        </Card.Text>
        <ListGroup className='details'>
          <ListGroup.Item className='details'>
            <span className='label'>Genre: </span>
            {movie.Genre[0].Name}
          </ListGroup.Item>
          <ListGroup.Item className='details'>
            <span className='label'>Director: </span>
            {movie.Director[0].Name}
          </ListGroup.Item>
          <ListGroup.Item className='details'>
            <span className='label'>Featured: </span>
            {featured}
          </ListGroup.Item>
        </ListGroup>
        <div className='favorites-container'>
          <Button
            variant='btn'
            className='favorite-button'
            onClick={(e) => this.addFavoriteMovie(e, movie)}
          >
            Add To Favorites
          </Button>
        </div>
        <div className='return-section'>
          <Link to={`/`}>
            <Button variant='btn' className='back-button'>
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
    Featured: PropTypes.bool.isRequired,
    genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
  }),
};
