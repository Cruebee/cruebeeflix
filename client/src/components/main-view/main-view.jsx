import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import './main-view.scss';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      register: null
    };
  }

  // One of the "hooks" available in a React Component
  componentDidMount() {
    axios
      .get('https://cruebeeflix.herokuapp.com/movies')
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

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onRegister(register) {
    this.setState({
      register
    });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    if (register) return <RegistrationView onRegister={register => this.onRegister(register)} />;
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} onRegister={register => this.onRegister(register)} />

    // Before the movies have been loaded
    if (!movies) return <div className='main-view' />;

    return (
      <Container className="main-view">
        <Row>
          {selectedMovie
            ? <MovieView movie={selectedMovie} />
            : movies.map(movie => (
              <Col>
                <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
              </Col>
            ))
          }
        </Row>
      </Container>
    );
  }
}
