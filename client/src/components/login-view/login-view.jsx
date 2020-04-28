import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './login-view.scss';


export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  const handleRegister = () => {
    props.onRegister(true);
  };

  return (
    <div>
      <h1 className='myflix-title'>Login</h1>
      <Form className='login-form'>
        <Form.Group controlId='formUsername'>
          <Form.Control
            type='text'
            placeholder='Enter Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group controlId='formPassword'>
          <Form.Control
            type='text'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Button
          className='submit-button'
          variant='success'
          type='submit'
          onClick={handleSubmit}
        >Submit
        </Button>
        <Form.Group className='registration-group' controlId='formRegistration'>
          <Form.Text className='text-muted'>Need an account?</Form.Text>
          <Button
            variant='info'
            className='registration-button'
            onClick={handleRegister}
          >Register Here
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}