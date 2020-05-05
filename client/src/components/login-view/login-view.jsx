import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, ' logged in');
    /* Send a request to the server for authentication */
    axios
      .post('https://cruebeeflix.herokuapp.com/login', {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        console.log("no such user");
      });
  };

  return (
    <Container className="login-view">
      <h1 className="login-title">Login</h1>
      <Form className="login-form">
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='login-submit'>
          <Button
            className="login-button"
            variant="success"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
        </Button>
        </Form.Group>
        <Form.Group className="registration-group" controlId="formRegistration">
          <Form.Text className="text-muted need-account">Need an account?</Form.Text>
          <Link to={`/register`}>
            <Button
              variant="info"
              className="registration-button"
            >
              Register Here
          </Button>
          </Link>
        </Form.Group>
      </Form>
    </Container>
  );
}
