import React from 'react';

import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useState, useEffect } from 'react'

const FavoritesBttn = ({ movie }) => {
  const [isFav, setIsFav] = useState(false);

  // console.log(movie) // 4 raza vizov idet pochemy?

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem('movie'))
    const favList = storageData ? storageData : []
    
    setIsFav(favList.includes(movie?.id) ? true : false)
  }, [movie]);

  function toggleToFav() {
    const storageData = JSON.parse(localStorage.getItem('movie'))
    const favList = storageData ? storageData : []


    if(favList.filter(item => item == movie.id).length) {
      const newFavList = favList.filter(item => item != movie.id)
      localStorage.setItem('movie', JSON.stringify(newFavList));
      setIsFav(false)
    } else {
      favList.push(movie.id)
      localStorage.setItem('movie', JSON.stringify(favList));
      setIsFav(true)
    }

  }

  return (
    <button
      className="movie__fav-icon"
      onClick={() => toggleToFav()}>
      {
        isFav ? <FaHeart /> : <FaRegHeart />
      }
    </button>
    
  );
};

export default FavoritesBttn;