import React, {useEffect, useRef} from 'react';
import '../styles/HomePage.scss';

import MoviesList from './../Components/MoviesList';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies, getGenres, setFetching } from "../features/movieSlice";
import MoviesFilter from '../Components/MoviesFilter';
import { useState } from 'react';


const HomePage = () => {

  const dispatch = useDispatch();
  const { loading, filteredMovies, fetching, movies } = useSelector(state => state.movies)
  
  const [currentPage, setCurrentPage] = useState(1)
  // const scrollContainerRef = useRef(null);


  useEffect(() => {
    dispatch(getGenres())
    // const scrollContainer = scrollContainerRef.current;

    // document.addEventListener('scroll', scrollHandler);
    // return function () {
    //   document.removeEventListener('scroll', scrollHandler);
    // }
  }, [])

  // useEffect(() => {
  //   if (fetching) {
  //     dispatch(getMovies(currentPage))
  //     setCurrentPage(prevState => prevState + 1)
  //   }
    
  // }, [fetching])


  // const scrollHandler = e => {
    
  //   if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
  //     dispatch(setFetching(true))
  //   }
      
  // }

  const clickHandler = e => {
    dispatch(getMovies(currentPage))
    setCurrentPage(prevState => prevState + 1)
  }


  return (
    <main
      // ref={scrollContainerRef}
    >
        <section className="movies">
          <div className="container">
            <h2 className="movies__title">Popular movies</h2>
            <MoviesFilter />
            {
              loading ? <h1>Loading</h1> : <MoviesList movies={movies} />
            }

            <button className='test' onClick={clickHandler}>test</button>
          </div>
        </section>
      </main>
  );
};

export default HomePage;