import React from 'react';

import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useState, useEffect } from 'react'

const FavoritesBttn = ({ movie }) => {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem('movie'))
    const favList = storageData ? storageData : []
    
    setIsFav(favList.filter(item => item.id === movie.id).length ? true : false)
  }, [movie]);

  function toggleToFav(e) {
    e.preventDefault();
    const storageData = JSON.parse(localStorage.getItem('movie'))
    const favList = storageData ? storageData : []


    if(favList.filter(item => item.id === movie.id).length) {
      const newFavList = favList.filter(item => item.id !== movie.id)
      localStorage.setItem('movie', JSON.stringify(newFavList));
      setIsFav(false)
    } else {
      favList.push({
        id: movie.id,
        title: movie.original_title,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        genre_ids: movie.genre_ids,
        poster_path: movie.poster_path
      })
      localStorage.setItem('movie', JSON.stringify(favList));
      setIsFav(true)
    }

  }

  return (
    <button
      className="movie__fav-icon"
      onClick={(e) => toggleToFav(e)}>
      {
        isFav ? <FaHeart /> : <FaRegHeart />
      }
    </button>
    
  );
};

export default FavoritesBttn;