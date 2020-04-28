import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './registration-view.scss';

export function RegistrationView(props) {

  const [username, createUsername] = useState('');
  const [password, createPassword] = useState('');
  const [email, createEmail] = useState('');
  const [birthday, createBirthday] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('Registered');
    props.onRegister(false)

    axios
      .post('https://cruebeeflix.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then((response) => {
        const data = response.data;
        alert('Your account has been created. Please login.');
        console.log(data);
        window.open('/client', '_self');
      })
      .catch((e) => {
        console.log('error registering user.');
      });
  };

  return (
    <div>
      <h1 className='app-title'>myFlix API Registration</h1>
      <Form className='registration-form'>
        <Form.Group controlId='formUsername'>
          <Form.Control
            type='text'
            placeholder='Create Username'
            value={username}
            onChange={(e) => createUsername(e.target.value)} />
        </Form.Group>
        <Form.Group controlId='formPassword'>
          <Form.Control
            type='text'
            placeholder='Create Password'
            value={password}
            onChange={(e) => createPassword(e.target.value)} />
        </Form.Group>
        <Form.Group controlId='formEmail'>
          <Form.Control
            type='text'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => createEmail(e.target.value)} />
        </Form.Group>
        <Form.Group controlId='formBirthday'>
          <Form.Control
            type='text'
            placeholder='Enter Birthday'
            value={birthday}
            onChange={(e) => createBirthday(e.target.value)} />
        </Form.Group>
        <Button
          className='submit-button'
          type='submit'
          onClick={handleRegister}
          variant='success'
        >Register
      </Button>
        <Form.Group className='login-group' controlId='formLogin'>
          <Form.Text className='text-muted'>Already have an account?</Form.Text>
          <Button
            className='back-button'
            onClick={() => window.open('main-view', '_self')}
            variant='primary'
          >Login Page
        </Button>
        </Form.Group>
      </Form>
    </div>
  );
}