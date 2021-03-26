window.addEventListener("load", function () {
  // look for the carousel
  var homePageCarousel = document.querySelector("#homePageCarousel");

  if (homePageCarousel) {
    // if it exists, initialize the carousel
    var carousel = new bootstrap.Carousel(homePageCarousel, {
      interval: 3000,
      pause: false,
    });
    var carouselPausePlay = document.querySelector(".carousel-pause");

    // start the carousel cycling
    carousel.cycle();

    // add pause/play functionality to the pause/play button
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
  }
});
