import React from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FavoritesBttn from '../Components/FavoritesBttn';

const MoviesItem = ({movie}) => {
  const genres = useSelector(state => state.movies.genres)

  const getGenreList = () => {
    let genreList = genres.filter((item) => movie?.genre_ids?.includes(item.id)) // дает ошибку 2 запроса
    const genreListStr = genreList.map((item) => item.name)

    return genreListStr.join(', ')
  }


  return (
    <li className="movies-list__item">
      <div className="movies-list__img">
        <FavoritesBttn movie={movie} />
         <img src={'https://www.themoviedb.org/t/p/w300_and_h450_bestv2' + movie.poster_path}></img>
      </div>
        <p className="movies-list__description">
          <span className="movies-list__year">{movie.release_date}</span>
          &#9900;
          <span className="movies-list__genre">{movie.vote_average}/10</span>
        </p>
      <Link className="movies-list__title" to={`/movie/${movie.id}`}>{movie.title}</Link>
      <p className='movies-list__genres'>
        {getGenreList()}.
      </p>
    </li>
  );
};

export default MoviesItem;