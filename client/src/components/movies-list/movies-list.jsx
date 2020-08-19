import React from 'react';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
// Redux import
import { connect } from 'react-redux';
// Custom imports
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

//import './movies-list.scss';

/**
 * @function LoopMoviesList
 * @description loops over all movies in database, to be rendered in main-view
 */
const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter((m) =>
      m.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }

  if (!movies) return <Container className='main-view' />;

  return (
    <Row className='movies-list'>
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      {filteredMovies.map((m) => (
        <MovieCard key={m._id} movie={m} />
      ))}
    </Row>
  );
}

export default connect(mapStateToProps)(MoviesList);
