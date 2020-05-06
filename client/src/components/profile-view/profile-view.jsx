import React from 'react';
import axios from 'axios';
// Bootstrap imports
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
// react-router imports
import { Link } from 'react-router-dom';
// scss import
import './profile-view.scss';

export class ProfileView extends React.Component {

  constructor() {
    super();

    this.Username = null,
      this.Password = null,
      this.Email = null,
      this.Birthday = null

    this.state = {
      userInfo: null,
      onLogOut: null
    };
  }

  componentDidMount() {
    this.getUserInfo(localStorage.getItem('user'), localStorage.getItem('token'));
  }

  getUserInfo(user, token) {
    axios.get(`https://cruebeeflix.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          userInfo: response.data
        })
      })
      .catch(error => {
        console.error(error);
      });
  }

  removeFavorite(e, movieId, movies) {
    e.preventDefault();
    axios({
      method: 'delete',
      url: `https://cruebeeflix.herokuapp.com/users/${localStorage.getItem('user')}/movies/${movieId}`,
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        alert(`${movies.Title}`, ' has been removed from your favorites list.');
        this.setState({
          userInfo: null
        })
        this.getUserInfo(localStorage.getItem('user'), localStorage.getItem('token'));
      })
      .catch(e => {
        console.error(e);
      });
  }

  updateUser(e, Username, Password, Email, Birthday, userInfo) {
    e.preventDefault();
    axios({
      method: 'put',
      url: `https://cruebeeflix.herokuapp.com/users/${localStorage.getItem('user')}`,
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      data: {
        Username: Username ? Username : userInfo.Username,
        Password: Password,
        Email: Email ? Email : userInfo.Email,
        Birthday: Birthday ? Birthday : userInfo.Birthday
      }
    })
      .then(response => {
        alert('Your account has been updated.');
      })
      .catch(error => {
        alert(error);
      })
  }

  deregisterUser(e) {
    e.preventDefault();
    axios({
      method: 'delete',
      url: `https://cruebeeflix.herokuapp.com/users/${localStorage.getItem('user')}`,
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => {
        alert(response.data + ' You will now be taken to the login screen.');
        this.props.onLogOut(true);
        window.open('/', '_self')
      })
      .catch(error => {
        console.error(error);
      })
  }

  setUsername(input) {
    this.Username = input;
  }

  setPassword(input) {
    this.Password = input;
  }

  setEmail(input) {
    this.Email = input;
  }

  setBirthday(input) {
    this.Birthday = input;
  }

  render() {

    const { userInfo } = this.state;
    if (!userInfo) return (
      <Spinner animation="grow" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );

    return (
      <Container className="profile-view">
        <h1 className="profile-view-title">Update Profile</h1>
        <Form className="profile-form">
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              className="form-item"
              type="text"
              placeholder="Enter Username"
              defaultValue={userInfo.Username}
              onChange={e => this.setUsername(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              className="form-item"
              type="password"
              placeholder="Enter Password"
              defaultValue={""}
              onChange={e => this.setPassword(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              className="form-item"
              type="text"
              placeholder="Enter Email"
              defaultValue={userInfo.Email}
              onChange={e => this.setEmail(e.target.value)} />
            <Form.Text className="text-muted">
              Your privacy is important to us, none of your information will be shared with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBirthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Text className="text-muted">
              We use this information to provide you with more age apropriate movies.
          </Form.Text>
            <Form.Control
              className="form-item"
              type="date"
              placeholder="Enter Birthday"
              defaultValue={userInfo.Birthday.split('T')[0]}
              onChange={e => this.setBirthday(e.target.value)} />
          </Form.Group>
          <div>
            <Button
              className="update-button"
              variant="btn"
              onClick={(e) => this.updateUser(e, this.Username, this.Password, this.Email, this.Birthday, userInfo)}
            >
              Update Profile
            </Button>
          </div>
        </Form>
        <div>
          <Link to={`/`}>
            <Button
              className="return-button"
              variant="btn"
            >
              Back
            </Button>
          </Link>
        </div>
        <Container className="profile-view">
          <h1 className="user-favorites">Favorite Movies</h1>
          <ListGroup className="favorites-list">
            {userInfo.FavoriteMovies.length === 0 && <ListGroup.Item>You have no favorite movies.</ListGroup.Item>}
            {userInfo.FavoriteMovies.map(movie => {
              return (<ListGroup.Item className="favorite-movies">
                <div>
                  {movie.Title}
                </div>
                <div className="delete-favorite">
                  <Button
                    variant="btn"
                    className="delete-button"
                    key={movie._id}
                    onClick={(e) => this.removeFavorite(e, movie._id)}
                  >
                    Delete Favorite
                    </Button>
                </div>
              </ListGroup.Item>)
            })
            }
          </ListGroup>
        </Container>
        <Container className="profile-view">
          <h1 className="deregister-user">Remove Account</h1>
          <ListGroup className="deregister-user-group">
            <Button
              variant="btn"
              className="deregister-button"
              onClick={(e) => this.deregisterUser(e)}
            >
              Remove Account
              </Button>
          </ListGroup>
        </Container>
      </Container>
    );
  }
}
