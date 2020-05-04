import React from 'react';
import axios from 'axios';
// Bootstrap imports
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
// react-router imports
import { Link } from 'react-router-dom';
// scss import
import './profile-view.scss';

export function ProfileView(props) {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [Birthday, setBirthday] = useState('');
  const userinfo = () => {
    axios.get(`https://cruebeeflix.herokuapp.com/users/${localStorage.getItem('user')}`, {
      headers: { Authorization: `${localStorage.getItem('token')}` }
    })
      .then(response => {
        return response.data;
      })
      .catch(err => {
        console.error(err);
      });
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    console.log(Username);
    // send request to server for auth:
    axios.post('https://cruebeeflix.herokuapp.com/users', {
      Username: Username,
      Password: Password,
      Email: Email,
      Birthday: Birthday
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self');
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <Container className="profile-view">
      <h1 className="profile-view-title">Update Profile</h1>
      <Form className="profile-form">
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            defaultValue={userinfo.Username}
            onChange={e => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Email"
            defaultValue={userinfo.Email}
            onChange={e => setEmail(e.target.value)} />
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
            type="date"
            placeholder="Enter Birthday"
            defaultValue={userinfo.Birthday}
            onChange={e => setBirthday(e.target.value)} />
        </Form.Group>
        <Button
          className="update-button"
          variant="primary"
          onClick={handleUpdate}>Update Profile</Button>
      </Form>
      <Container className="profile-view">
        <h1 className="favorites-title">Favorite Movies</h1>
        <ListGroup className="favorites-title">
          {userinfo.FavoriteMovies.map(movie => {
            return <ListGroup.Item>{movie.Title}</ListGroup.Item>
          })
          }
        </ListGroup>
      </Container>
    </Container>
  );
}
