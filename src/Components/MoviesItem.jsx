import React, { useMemo } from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FavoritesBttn from '../Components/FavoritesBttn';

import noImg from './../images/no-image.png'

const MoviesItem = ({movie}) => {
  const genres = useSelector(state => state.movies.genres)
  const image = movie.poster_path ? 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2' + movie.poster_path : noImg // link to const

  const getGenreList = (genres) => {
    let genreList = genres.filter((item) => movie?.genre_ids?.includes(item.id)) // if(...) return item.name
    const genreListStr = genreList.map((item) => item.name)

    return genreListStr.join(', ')
  }

  const memoGenreList = useMemo(() => getGenreList(genres), [genres])


  return (
    <li className="movies-list__item">
      <Link className="movies-list__link" to={`/movie/${movie.id}`}>
        <div className="movies-list__img">
          <FavoritesBttn movie={movie} />
          <img src={image}></img>
        </div>
          <p className="movies-list__description">
            <span className="movies-list__year">{movie.release_date}</span>
            &#9900;
            <span className="movies-list__genre">{movie.vote_average}/10</span>
          </p>
        <p className="movies-list__title">{movie.title}</p>
        <p className='movies-list__genres'>{memoGenreList}.</p>
      </Link>
    </li>
  );
};

export default MoviesItem;