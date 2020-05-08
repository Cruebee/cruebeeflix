import React from 'react';
import axios from 'axios';
// Redux imports
import { connect } from 'react-redux';
// React-Bootsrap imports
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Spinner from 'react-bootstrap/Spinner';
// React-router imports
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
// Actions import
import { setMovies } from '../../actions/actions';
// MoviesList import
import MoviesList from '../movies-list/movies-list';
// View imports
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

import './main-view.scss';

class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      user: null,
      register: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
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

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  // Log Out
  onLogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open('/client', '_self');

    this.setState({
      user: null,
    });
    console.log('logged out');
  }

  // Get Movies
  getMovies(token) {
    axios
      .get('https://cruebeeflix.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {

    let { movies } = this.props;
    let { user } = this.state;

    return (
      <Router basename="/client">
        <Container className="main-view" fluid="true">
          <Navbar className="navbar navbar-dark">
            <h1 className="main-view-title">myFlix</h1>
            <div className="button-container">
              <Link to={`/users/${localStorage.getItem('user')}`}>
                <Button
                  className="profile-button"
                  variant="btn"
                  onClick
                >
                  Profile
              </Button>
              </Link>
              <Button
                className="log-out-button"
                variant="btn"
                onClick={user => this.onLogOut(!user)}
              >
                Log Out
            </Button>
            </div>
          </Navbar>
          <Row>
            <Route exact path="/client" render={() => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              return movies.map(m => <MoviesList movies={movies} />)
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

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);
