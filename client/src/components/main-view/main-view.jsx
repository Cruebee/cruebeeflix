import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from "react-router-dom";

import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from '../profile-view/profile-view';

import "./main-view.scss";

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      user: null,
      register: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  // Authentication

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  // Log Out
  onLogOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.open('/', '_self');

    this.setState({
      user: null,
    });
    console.log("logged out");
  }

  // Get Movies
  getMovies(token) {
    axios
      .get("https://cruebeeflix.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movies, user } = this.state;
    if (!movies) return <Container className="main-view" />;

    return (
      <Router>
        <Container className="main-view">
          <Row>
            <Navbar className="navbar navbar-dark">
              <h1 className="main-view-title">myFlix</h1>
            </Navbar>
          </Row>
          <Row>
            <Col>
              <Link to={`/users/${localStorage.getItem('user')}`}>
                <Button
                  className="profile-button"
                  variant="primary"
                  onClick
                >
                  Profile
              </Button>
              </Link>
            </Col>
            <Col>
              <Button
                className="log-out-button"
                variant="info"
                onClick={user => this.onLogOut(!user)}
              >
                Log Out
            </Button>
            </Col>
          </Row>
          <Row>
            <Route exact path="/" render={() => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              return movies.map(m => <MovieCard key={m._id} movie={m} />)
            }} />
            <Route path="/register" render={() => <RegistrationView />} />
            <Route path="/movies/:MovieId" render={({ match }) =>
              <MovieView movie={movies.find(m => m._id === match.params.MovieId)} />} />
            <Route path="/genres/:Name" render={({ match }) => {
              if (movies.length === 0) return <Container className="main-view" />;
              return <GenreView Genre={movies.find(m => m.Genre[0].Name === match.params.Name).Genre} />
            }} />
            <Route path="/directors/:Name" render={({ match }) => {
              if (movies.length === 0) return <Container className="main-view" />;
              return <DirectorView Director={movies.find(m => m.Director[0].Name === match.params.Name).Director} />
            }} />
            <Route path="/users/:Username" render={() => {
              if (movies.length === 0) return <Container className="main-view" />;
              return <ProfileView onLogOut={user => this.onLogOut(!user)} />
            }} />
          </Row>
        </Container>
      </Router>
    );
  }
}
