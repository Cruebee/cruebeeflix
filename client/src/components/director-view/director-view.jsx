import React from 'react';
import PropTypes, { arrayOf } from 'prop-types';
// Bootstrap imports
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// react-router imports
import { Link } from 'react-router-dom';

// import SCSS
import './director-view.scss';

/**
 * @function DirectorView
 * @description Contains information about directors: name, bio, birth, and death if available
 * @param {string} props - director, movies
 * @returns {DirectorView}
 */

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { Director } = this.props;

    if (!Director) return null;

    return (
      <Card className='director-view' style={{ width: '30rem' }}>
        <Card.Img variant='top' src={Director[0].ImagePath} />
        <Card.Body>
          <Card.Title className='director-info'>
            <span className='label'>Name: </span>
            {Director[0].Name}
          </Card.Title>
          <Card.Text className='director-info'>
            <span className='label'>Bio: </span>
            {Director[0].Bio}
          </Card.Text>
          <Card.Text className='director-info'>
            <span className='label'>Birth: </span>
            {Director[0].Birth}
          </Card.Text>
          <Card.Text className='director-info'>
            <span className='label'>Death: </span>
            {Director[0].Death}
          </Card.Text>
          <Link to={`/`}>
            <Button className='back-button' variant='btn'>
              Back
            </Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

DirectorView.propTypes = {
  Director: arrayOf(
    PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
    })
  ).isRequired,
};
