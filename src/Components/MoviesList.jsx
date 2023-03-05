import React from 'react';
import MoviesItem from './MoviesItem';

import '../styles/MoviesList.scss'

const MoviesList = ({ movies }) => {

  return (
    <ul className="movies-list">
      {
        movies.map((item, index) => <MoviesItem movie={item} key={item.id} />)
      }
    </ul>
  );
};

export default MoviesList;