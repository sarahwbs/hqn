window.onload = function () {
  // initialize the carousel
  var myCarousel = document.querySelector("#homePageCarousel");
  var carousel = new bootstrap.Carousel(myCarousel, {
    interval: 3000,
    pause: false,
  });
  var carouselPausePlay = document.querySelector(".carousel-pause");

  // start the carousel cycling
  carousel.cycle();

  // add pause/play functionality to the pause/play button
  carouselPausePlay &&
    carouselPausePlay.addEventListener("click", function (e) {
      if (carousel._isPaused) {
        // go to the next slide immediately, then start cycling
        carousel.next();
        carousel.cycle();
      } else {
        carousel.pause();
      }
      e.target.classList.toggle("carousel-pause");
      e.target.classList.toggle("carousel-play");
    });
};
