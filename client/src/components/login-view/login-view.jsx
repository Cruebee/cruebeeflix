import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to server for authentication */
    axios
      .post("https://cruebeeflix.herokuapp.com/login", {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        console.log("user does not exist");
      });
  };

  const handleRegister = () => {
    props.onNeedRegistration(true);
  };

  return (
    <div>
      <h1 className="login-title">Login</h1>
      <Form className="login-form">
<<<<<<< HEAD
<<<<<<< HEAD
        <Form.Group controlId="formBasicUsername">
=======
        <Form.Group controlId="formUsername">
>>>>>>> parent of 984d455... revert to before jwt auth enabled on server-side
=======
        <Form.Group controlId="formBasicUsername">
>>>>>>> parent of 2ea955d... authentication is not working won't allow login
          <Form.Control
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
<<<<<<< HEAD
<<<<<<< HEAD
        <Form.Group controlId="formBasicPassword">
=======
        <Form.Group controlId="formPassword">
>>>>>>> parent of 984d455... revert to before jwt auth enabled on server-side
=======
        <Form.Group controlId="formBasicPassword">
>>>>>>> parent of 2ea955d... authentication is not working won't allow login
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button
          className="submit-button"
          variant="success"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Form.Group className="registration-group" controlId="formRegistration">
          <Form.Text className="text-muted">Need an account?</Form.Text>
          <Button
            variant="info"
            className="registration-button"
            onClick={handleRegister}
          >
            Register Here
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}
