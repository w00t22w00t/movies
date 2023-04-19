import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa';

import { getMovies, getSearchMovies, setSearch, setCurrentPage } from "../features/movieSlice";

const MoviesFilter = () => {
  const dispatch = useDispatch();
  const { search, currentPage } = useSelector(state => state.movies)
  const [input, setInput] = useState('')
  
  React.useEffect(() => {
    const getData = setTimeout(() => {
      dispatch(setCurrentPage(1))
      dispatch(setSearch(input))

      if (input.length) {
        dispatch(getSearchMovies({word: input, page: 1}))
      } else {
        dispatch(getMovies(currentPage))
      }
    }, 500)

    return () => clearTimeout(getData)
  }, [input])
  

  return (
    <div className="movies-filter">
      <h3 className="movies-filter__title">Filter by:</h3>
      <div className="movies-filter__line"></div>
      <div className='movies-filter__search'>
        <FaSearch />
        <input 
          type="text" 
          placeholder='Search...'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </div>
  );
};

export default MoviesFilter;