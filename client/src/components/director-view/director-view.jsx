import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


import './director-view.scss';

export class DirectorView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { director } = this.props;

    if (!director) return null;

    return (
      <Card className='director-view' style={{ width: '32rem' }}>
        <Card.Img variant='top' src={director.ImagePath} />
        <Card.Body>
          <Card.Title className='director-name'>{director.Name}</Card.Title>
          <Card.Text className='director-bio'>{director.Bio}</Card.Text>
          <Card.Text className='director-birth'>{director.Birth}</Card.Text>
          <Card.Text className='director-death'>{director.Death}</Card.Text>

          <Button
            onClick={() => window.open('main-view', '_self')}
            variant='primary'
          >Back
          </Button>

        </Card.Body>
      </Card>
    )

  }
}