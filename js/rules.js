'use strict';

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnPrevious = document.querySelector('.rules__btn--previous');
  const btnNext = document.querySelector('.rules__btn--next');
  let curSlide = 0;

  const maxSlide = slides.length;

  const goToSlide = function (slide) {
    slides.forEach(function (s) {
      if (s.classList.contains(`slide--${slide}`)) {
        s.classList.remove('hidden');
      } else {
        s.classList.add('hidden');
      }
    });
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
  };

  const init = function () {
    goToSlide(0);
  };
  init();

  btnNext.addEventListener('click', nextSlide);
  btnPrevious.addEventListener('click', prevSlide);
};

slider();
