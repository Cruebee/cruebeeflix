import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Link } from "react-router-dom";

import "./movie-view.scss";
import Axios from "axios";

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
      <Container className="movie-container">
        <Row>
          <Col>
            <div className="movie-view">
              <img className="movie-poster" src={movie.ImagePath} />

              <div className="movie-title">
                <span className="label">Title: </span>
                <span className="value">{movie.Title}</span>
              </div>

              <div className="movie-description">
                <span className="label">Description: </span>
                <span className="value">{movie.Description}</span>
              </div>

              <div className="movie-genre">
                <span className="label">Genre: </span>
                <span className="value">{movie.Genre[0].Name}</span>
              </div>

              <div className="movie-director">
                <span className="label">Director: </span>
                <span className="value">{movie.Director[0].Name}</span>
              </div>

              <div>
                <span className="label">Featured: </span>
                <span className="value">{featured}</span>
              </div>

              <div className="favorite-button-container">
                <span className="label">Add to Favorites: </span>
                <Button
                  className="favorite-button"
                  onClick={(e) => this.addFavoriteMovie(e, movie)}
                >
                  Add Favorite
                  </Button>
              </div>

              <Link to={`/`}>
                <Button
                  className="back-button"
                  variant="info"
                >
                  Back
              </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
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
