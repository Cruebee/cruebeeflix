import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import "./director-view.scss";

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie, Director } = this.props;

    if (!Director) return null;

    return (
      <Card className="director-view" style={{ width: "32rem" }}>
        <Card.Img variant="top" src={Director.ImagePath} />
        <Card.Body>
          <Card.Title className="director-name">{Director.Name}</Card.Title>
          <Card.Text className="director-bio">{Director.Bio}</Card.Text>
          <Card.Text className="director-birth">{Director.Birth}</Card.Text>
          <Card.Text className="director-death">{Director.Death}</Card.Text>

          <Button
            onClick={() => window.open("main-view", "_self")}
            variant="primary"
          >
            Back
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
};
