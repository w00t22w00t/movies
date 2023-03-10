import React from 'react';

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import '../styles/SinglePage.scss';
import FavoritesBttn from '../Components/FavoritesBttn';

const SinglePage = () => {
  const {id} = useParams();
  const [movie, setMovie] = useState([]);
  


  

  console.log('render') // 3 times?


  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=26ac3f2370b5a5e3c4c1c1973e8006c4&language=en-US`)
      .then(res => res.json())
      .then(data => setMovie(data))

  }, [id]);

  


  const languages = Array.isArray(movie.spoken_languages) ? movie.spoken_languages?.map(item => item.english_name) : []


  


  return (
    <main>
      <section className="movie">
        <div className="container">
          <div className="movie__img">
          <FavoritesBttn movie={movie} />
            <img src={'https://www.themoviedb.org/t/p/w300_and_h450_bestv2' + movie.poster_path}></img>
          </div>
          <div className="movie__content">
            <h1 className="movie__title">{movie.title}</h1>
            <p className="movie__info">{movie.release_date} &#9900; {movie.vote_average}/10</p>
            <p className="movie__language">{languages.length ? languages.join(', ') : ''}</p>
            <p className="movie__description">{movie.overview}</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SinglePage;