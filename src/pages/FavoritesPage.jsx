import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MoviesList from '../Components/MoviesList';
import { getMovies, getGenres } from "../features/movieSlice";

const FavoritesPage = () => {
  const dispatch = useDispatch()
  // const {movies, favList} = useSelector(state => state.movies)

  useEffect(() => {
    dispatch(getGenres())
  }, [])



  const filteredMovies = () => {
    const storageData = JSON.parse(localStorage.getItem('movie'))
    const favList = storageData ? storageData : []

    return favList
  }



  return (
    <main>
      <div className="container">
        <MoviesList movies={filteredMovies()} />
      </div>
    </main>
  );
};

export default FavoritesPage;