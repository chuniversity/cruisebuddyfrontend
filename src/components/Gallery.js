import React from 'react';
import Swiper from 'react-id-swiper';

const params = {
  slidesPerView: 5,
  spaceBetween: 50,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  autoplay: {
    delay: 8000,
    disableOnInteraction: true
  },
  breakpoints: {
    2720: {
      slidesPerView: 7,
      spaceBetween: 40
    },   
    2420: {
      slidesPerView: 6,
      spaceBetween: 40
    },   
    1920: {
      slidesPerView: 5,
      spaceBetween: 40
    },   
    1440: {
      slidesPerView: 4,
      spaceBetween: 40
    },   
    1024: {
      slidesPerView: 3,
      spaceBetween: 40
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    320: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    220: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    120: {
      slidesPerView: 1,
      spaceBetween: 10
    }
  }
}



  const Gallery = ({ shipImages }) => (
    <div>
      <Swiper {...params}>
      {shipImages.map(({ url }) => (
        <div className="ship-gallery-wrapper">
          <img className="ship-gallery-image" src={url} alt="ship" />
        </div>
      ))}
      </Swiper>
    </div>
  )

  export default Gallery;