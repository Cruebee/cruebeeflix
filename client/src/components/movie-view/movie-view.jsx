import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './movie-view.scss';

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie, onClick } = this.props;

    if (!movie) return null;

    return (
      <Container>
        <Row className='justify-content-center'>
          <Col>
            <div className='movie-view'>

              <img className='movie-poster' src={movie.ImagePath} />

              <div className='movie-title'>
                <span className='label'>Title:</span>
                <span className='value'>{movie.Title}</span>
              </div>

              <div className='movie-description'>
                <span className='label'>Description:</span>
                <span className='value'>{movie.Description}</span>
              </div>

              <div className='movie-genre'>
                <span className='label'>Genre:</span>
                <span className='value'>{movie.Genre[0].Name}</span>
                <Button
                  onClick={() => onClick(genre)}
                  variant='primary'
                  disabled
                >Genre
                  </Button>
              </div>

              <div className='movie-director'>
                <span className='label'>Director:</span>
                <span className='value'>{movie.Director[0].Name}</span>
                <Button
                  onClick={() => onClick(director)}
                  variant='primary'
                  disabled
                >Director
                  </Button>
              </div>

              <Button
                className='back-button'
                onClick={() => window.open('main-view', '_self')}
                variant='primary'
              >Back
                </Button>

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
      Name: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    })
  }).isRequired,
  onClick: PropTypes.func.isRequired
};
