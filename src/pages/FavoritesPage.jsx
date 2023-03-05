import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MoviesList from '../Components/MoviesList';
import { getMovies, getGenres } from "../features/movieSlice";

const FavoritesPage = () => {
  const dispatch = useDispatch()
  const {movies} = useSelector(state => state.movies)

  useEffect(() => {
    dispatch(getMovies())
    dispatch(getGenres())
  }, [])

  const storageData = JSON.parse(localStorage.getItem('movie'))
  const favList = storageData ? storageData : []


  const filteredMovies = movies.filter(item => favList.includes(item.id))



  return (
    <main>
      <div className="container">
        <MoviesList movies={filteredMovies} />
      </div>
    </main>
  );
};

export default FavoritesPage;