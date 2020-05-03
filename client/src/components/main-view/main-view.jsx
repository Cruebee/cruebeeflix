import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

import "./main-view.scss";

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null,
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

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
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

  // Registration
  onNeedRegistration(registration) {
    this.setState({
      registration,
    });
  }

  render() {
    const { movies, selectedMovie, user, registration } = this.state;
    if (registration)
      return (
        <RegistrationView
          onNeedRegistration={(registration) =>
            this.onNeedRegistration(registration)
          }
        />
      );
    if (!user)
      return (
        <LoginView
          onLoggedIn={(user) => this.onLoggedIn(user)}
          onNeedRegistration={(registration) =>
            this.onNeedRegistration(registration)
          }
        />
      );
    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        <Navbar className="navbar navbar-dark">
          <h1 className="main-view-title">myFlix Movies</h1>
        </Navbar>
        <Container>
          <Row>
            {selectedMovie ? (
              <MovieView
                movie={selectedMovie}
                mainview={(movie) => this.onMovieClick(null)}
                director={(d) => console.log(d)}
              />
            ) : (
              movies.map((movie) => (
                <MovieCard
                  key={movie._id}
                  movie={movie}
                  onClick={(movie) => this.onMovieClick(movie)}
                />
              ))
            )}
          </Row>
        </Container>
      </div>
    );
  }
}
