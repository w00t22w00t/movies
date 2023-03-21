import React, {useEffect, useRef} from 'react';
import '../styles/HomePage.scss';

import MoviesList from './../Components/MoviesList';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies, getGenres, setFetching, setCurrentPage } from "../features/movieSlice";
import MoviesFilter from '../Components/MoviesFilter';
import { useState } from 'react';


const HomePage = () => {

  const dispatch = useDispatch();
  const { loading, filteredMovies, fetching, movies, currentPage } = useSelector(state => state.movies)
  

  useEffect(() => {
    dispatch(getGenres())

    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    }
  }, [])

  useEffect(() => {
    if (fetching) {
      dispatch(setCurrentPage())
      dispatch(getMovies(currentPage))
    }
    
  }, [fetching])


  const scrollHandler = e => {
    
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
      dispatch(setFetching(true))
    }
      
  }


  return (
    <main>
        <section className="movies">
          <div className="container">
            <h2 className="movies__title">Popular movies</h2>
            <MoviesFilter />
            {
              loading && movies.length === 0 ? <h1>Loading</h1> : <MoviesList movies={filteredMovies} />
            }
          </div>
        </section>
      </main>
  );
};

export default HomePage;


// todo
// 1. переделать поиск
// 2. добавить похожие фильмы (доделать стили)