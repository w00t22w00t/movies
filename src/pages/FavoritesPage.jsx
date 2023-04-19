import React, { useEffect, useMemo } from 'react';
import '../styles/FavoritesPage.scss';

import { useDispatch } from 'react-redux';
import MoviesList from '../Components/MoviesList';
import { getGenres } from "../features/movieSlice";

const FavoritesPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getGenres())
  }, [])



  const filteredMovies = () => {
    const storageData = JSON.parse(localStorage.getItem('movie'))
    const favList = storageData ? storageData : []

    return favList
  }

  const memoFilteredMovies = useMemo(() => filteredMovies(), [])



  return (
    <main className="favorites">
      <div className="container">
        <h2 className='favorites__title'>Favorites List</h2>
        <MoviesList movies={memoFilteredMovies} />
      </div>
    </main>
  );
};

export default FavoritesPage;