import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import Select from 'react-select';

import { getMovies, getSearchMovies, setSearch, setCurrentPage } from "../features/movieSlice";

const MoviesFilter = () => {
  const dispatch = useDispatch();
  const {search, currentPage} = useSelector(state => state.movies)
  
  function searchMovieWord(searchWord) {
    dispatch(setCurrentPage(1))
    dispatch(setSearch(searchWord))

    if (searchWord.length) {
      dispatch(getSearchMovies({word: searchWord, page: 1}))
    } else {
      dispatch(getMovies(currentPage))
    }
  }

  // function searchMovieGenre(searchWord) {
  //   dispatch(searchMovies(searchWord))
  //   setSearch({...search, genre: searchWord.genre})
  // }

  // const customGenres = genres.map(item => {
  //   return {
  //     value: item.name,
  //     label: item.name,
  //     id: item.id
  //   }
  // })

  // customGenres.splice(0, 0, {value: 'all', label: 'All'});

  return (
    <div className="movies-filter">
      <h3 className="movies-filter__title">Filter by:</h3>
      <div className="movies-filter__line"></div>
      <div className='movies-filter__search'>
        <FaSearch />
        <input 
          type="text" 
          placeholder='Search...'
          value={search}
          onChange={(e) => searchMovieWord(e.target.value)}
        />
      </div>
      {/* <Select 
        placeholder='Genres' 
        className='movies-filter__filterby' 
        options={customGenres}
        onChange={(selectedOption) => searchMovieGenre({ ...search, genre: selectedOption })}     
      />   */}
    </div>
  );
};

export default MoviesFilter;