import React from "react";

export class MovieCard extends React.Component {
  render() {
    // This is given to the <MovieCard/> component by the outer world
    // Which in this case, is the "MainView", as "MainView" is what's connected to your DB
    // Via the movies endpoint of your API
    const { movie, onClick } = this.props;

    return (
      <div onClick={() => onClick(movie)} className="movie-card">
        {movie.Title}
      </div>
    );
  }
}
