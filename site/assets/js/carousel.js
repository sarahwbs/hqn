window.addEventListener("load", function () {
  // look for the carousel
  var homePageCarousel = document.querySelector("#homePageCarousel");

  if (homePageCarousel) {
    // if it exists, initialize the carousel
    var carousel = new bootstrap.Carousel(homePageCarousel, {
      interval: 3000,
    });

    const updateSlide = (e) => {
      // if (announceItem) {
      const liveregion = homePageCarousel.querySelector(".liveregion");
      const slides = homePageCarousel.querySelectorAll(".carousel-item");
      liveregion.textContent = "Slide " + (e.to + 1) + " of " + slides.length;
      // }
    };

    homePageCarousel.addEventListener("slide.bs.carousel", function (e) {
      updateSlide(e);
    });

    // start the carousel cycling
    carousel.cycle();

    // add pause/play functionality to the pause/play button
    const carouselPausePlay = document.querySelector(".carousel-pause");
    carouselPausePlay.addEventListener("click", function (e) {
      const button = e.target;
      const buttonSpan = button.querySelector("span");

      if (carousel._isPaused) {
        // go to the next slide immediately, then start cycling
        carousel.next();
        carousel.cycle();
        buttonSpan.innerHTML = "Stop Animation";
        button.setAttribute("aria-label", "Pause");
        button.setAttribute("data-action", "stop");
      } else {
        carousel.pause();
        buttonSpan.innerHTML = "Start Animation";
        button.setAttribute("aria-label", "Play");
        button.setAttribute("data-action", "start");
      }
      button.classList.toggle("carousel-pause");
      button.classList.toggle("carousel-play");
    });
  }
});
