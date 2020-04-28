import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './genre-view.scss';

export class GenreView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { genre } = this.props;

    if (!genre) return null;

    return (
      <Card className='genre-view' style={{ width: '32rem' }}>
        <Card.Body>
          <Card.Title className='genre-name'>{genre.Name}</Card.Title>
          <Card.Text className='genre-description'>{genre.Description}</Card.Text>

          <Button
            onclick={() => window.open('main-view', '_self')}
            variant='primary'
          >Back
        </Button>
        </Card.Body>
      </Card>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired
}