import React, { useState } from 'react';
import axios from 'axios';
// React-Bootstrap imports
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
// react-router imports
import { Link } from 'react-router-dom';

import './registration-view.scss';

export function RegistrationView(props) {
  const [username, createUsername] = useState('');
  const [password, createPassword] = useState('');
  const [email, createEmail] = useState('');
  const [birthday, createBirthday] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Registered");

    axios
      .post('https://cruebeeflix.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      })
      .then((response) => {
        const data = response.data;
        alert("Your account has been created. Please login.");
        console.log(data);
        window.open("/", "_self");
      })
      .catch((e) => {
        console.log("error registering user.");
      });
  };

  return (
    <Container>
      <h1 className="register-title">Registration</h1>
      <Form className="registration-form">
        <Form.Group controlId="formBasicUsername">
          <Form.Control
            type="text"
            placeholder="Create Username"
            value={username}
            onChange={(e) => createUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => createPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => createEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicBirthday">
          <Form.Control
            type="text"
            placeholder="Enter Birthday"
            value={birthday}
            onChange={(e) => createBirthday(e.target.value)}
          />
        </Form.Group>
        <Button
          className="registration-button"
          type="submit"
          onClick={handleRegister}
          variant="btn"
        >
          Register
        </Button>
        <Form.Group className="login-group" controlId="formLogin">
          <Form.Text className="text-muted">Already have an account?</Form.Text>
          <Link to={`/`}>
            <Button
              className="back-button"
              variant="btn"
            >
              Login
          </Button>
          </Link>
        </Form.Group>
      </Form>
    </Container>
  );
}
