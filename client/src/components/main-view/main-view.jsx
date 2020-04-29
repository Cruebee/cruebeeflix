import React from "react";
import axios from "axios";
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

  // One of the "hooks" available in a React Component
  componentDidMount() {
    axios
      .get("https://cruebeeflix.herokuapp.com/movies")
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie,
    });
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

  getMovies(token) {
    axios
      .get("https://cruebeeflix.herokuapp.com/movies", {
        header: { Authorization: "Bearer ${token}" },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Registration
  onRegister(register) {
    this.setState({
      register,
    });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    if (register)
      return (
        <RegistrationView
          onRegister={(register) => this.onRegister(register)}
        />
      );
    if (!user)
      return (
        <LoginView
          onLoggedIn={(user) => this.onLoggedIn(user)}
          onRegister={(register) => this.onRegister(register)}
        />
      );

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        <Navbar className="navbar navbar-dark">
          <h1 className="main-view-title">myFlix Movies</h1>
        </Navbar>

        <Container className="main-view-movies">
          <Row>
            {selectedMovie ? (
              <MovieView movie={selectedMovie} />
            ) : (
              movies.map((movie) => (
                <Col>
                  <MovieCard
                    key={movie._id}
                    movie={movie}
                    onClick={(movie) => this.onMovieClick(movie)}
                  />
                </Col>
              ))
            )}
          </Row>
        </Container>
      </div>
    );
  }
}
