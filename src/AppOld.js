import React, { useMemo, useState } from 'react';
import './App.scss';

import { FaSearch } from 'react-icons/fa';
import Select from 'react-select';
import MoviesList from './Components/MoviesList';

function App() {
  const data = [
    {title: 'Aquaman', year: 2018, genre: ['fantasy', 'action'], id: 1},
    {title: 'Batman', year: 2008, genre: ['drama', 'thriller'], id: 2},
    {title: 'Avatar', year: 2009, genre: ['fantasy', 'science fiction'], id: 3},
    {title: 'Gladiator', year: 2000, genre: ['drama', 'action'], id: 4},
    {title: 'The Avangers', year: 2012, genre: ['fantasy', 'action'], id: 5}
  ];

  const genres = [
    {value: 'all', label: 'All'},
    {value: 'fantasy', label: 'Fantasy'},
    {value: 'action', label: 'Action'},
    {value: 'drama', label: 'Drama'},
    {value: 'science fiction', label: 'Science fiction'}
  ];

  const [filteredData, setFilteredData] = useState(data);

  const [search, setSearch] = useState({word: '', genre: 'all'});

  function searchMovie(searchWord) {
    
    const filter = data.filter(function(item, index) {
      return item.title.toLowerCase().includes(searchWord.word.toLowerCase()) && item.genre.includes(searchWord.genre) ;
    })
    

    setFilteredData(filter)
    setSearch({...search, word: searchWord.word})
  }


  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <h1 className='App-header__logo'>Movies List</h1>
          <div className='App-header__search'>
            <FaSearch />
            <input 
              type="text" 
              placeholder='Search...'
              value={search.word}
              onChange={(e) => searchMovie({...search, word: e.target.value})}
            />
          </div>
        </div>
      </header>
      
      <main>
        <section className="movies">
          <div className="container">
            <h2 className="movies__title">Random movies</h2>
            <div className="movies-sort">
              <h3 className="movies-sort__title">Sorted by:</h3>
              <div className="movies-sort__line"></div>
              {/* <p className='movies-sort__sortby'>Genre</p>
              <p className='movies-sort__sortby'>Year</p> */}
              <Select 
                placeholder='Genres' 
                className='movies-sort__sortby' 
                options={genres} 
                onChange={(selectedOption) => searchMovie({...search, genre: selectedOption.value}) } />
            </div>

            {filteredData.length ? 
            <MoviesList data={filteredData} /> : 
            <p>Movies not found</p>
            }
            
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <div className='copyright'>© 2023 Random Company. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
