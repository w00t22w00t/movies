import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovies } from "./../features/movieSlice";
import { FaSearch } from 'react-icons/fa';
import Select from 'react-select';

const MoviesFilter = () => {
  const dispatch = useDispatch();
  const {genres} = useSelector(state => state.movies)
  const [search, setSearch] = useState({ word: '', genre: { value: 'all', label: 'All' } });
  
  function searchMovieWord(searchWord) {
    dispatch(searchMovies(searchWord))
    setSearch({...search, word: searchWord.word})
  }

  function searchMovieGenre(searchWord) {
    dispatch(searchMovies(searchWord))
    setSearch({...search, genre: searchWord.genre})
  }

  const customGenres = genres.map(item => {
    return {
      value: item.name,
      label: item.name,
      id: item.id
    }
  })

  customGenres.splice(0, 0, {value: 'all', label: 'All'});

  return (
    <div className="movies-filter">
      <h3 className="movies-filter__title">Filter by:</h3>
      <div className="movies-filter__line"></div>
      <div className='movies-filter__search'>
        <FaSearch />
        <input 
          type="text" 
          placeholder='Search...'
          value={search.word}
          onChange={(e) => searchMovieWord({ ...search, word: e.target.value })}
        />
      </div>
      <Select 
        placeholder='Genres' 
        className='movies-filter__filterby' 
        options={customGenres}
        onChange={(selectedOption) => searchMovieGenre({ ...search, genre: selectedOption })}     
      />  
    </div>
  );
};

export default MoviesFilter;