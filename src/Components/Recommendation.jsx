import React from 'react';
import { Link } from 'react-router-dom';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import '../styles/Recommendation.scss';


import noImg from './../images/no-image.png'


const Recommendation = ({ movies }) => {
  return (
    <section className="recommendation">
        <div className="container">
          <h3>Recommendation: </h3>
            <Swiper
              modules={[Navigation]}
              spaceBetween={50}
              slidesPerView={3}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
              navigation
              pagination={{ clickable: true }}
            >
              {
            movies.map(movie => {
              const image = movie.poster_path ? 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2' + movie.poster_path : noImg
                  return (
                    <SwiperSlide key={movie.id}>
                      <div className="recommendation__img">
                        <img src={image}></img>
                      </div>
                      <Link className="recommendation__img__title" to={`/movie/${movie.id}`}>{movie.title}</Link>
                      <h4>{ movie.title }</h4>
                    </SwiperSlide>
                  )
                })
              }
            
            </Swiper>
        </div>
      </section>
    
  );
};

export default Recommendation;