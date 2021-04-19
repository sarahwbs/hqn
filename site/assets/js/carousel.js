window.addEventListener("load", function () {
  // look for the carousel
  const homePageCarousel = document.querySelector("#homePageCarousel");

  if (homePageCarousel) {
    // if it exists, initialize the carousel
    const carousel = new bootstrap.Carousel(homePageCarousel, {
      interval: 3000,
    });
    const carouselPausePlay = document.querySelector(".carousel-pause");
    const pausePlayText = carouselPausePlay.querySelector("span");

    function pauseCarousel() {
      carousel.pause();
      pausePlayText.innerHTML = "Start Animation";
      carouselPausePlay.setAttribute("aria-label", "Play");
      carouselPausePlay.setAttribute("data-action", "start");
      carouselPausePlay.classList.remove("carousel-pause");
      carouselPausePlay.classList.add("carousel-play");
    }

    function unpauseCarousel() {
      console.log(carouselPausePlay);
      // go to the next slide immediately, then start cycling
      carousel.next();
      carousel.cycle();
      pausePlayText.innerHTML = "Stop Animation";
      carouselPausePlay.setAttribute("aria-label", "Pause");
      carouselPausePlay.setAttribute("data-action", "stop");
      carouselPausePlay.classList.add("carousel-pause");
      carouselPausePlay.classList.remove("carousel-play");
    }

    // when the slide updates, change the text in the live region for screen readers
    homePageCarousel.addEventListener("slide.bs.carousel", function (e) {
      const liveregion = homePageCarousel.querySelector(".liveregion");
      const slides = homePageCarousel.querySelectorAll(".carousel-item");
      liveregion.textContent = "Slide " + (e.to + 1) + " of " + slides.length;
    });

    // add pause/play functionality to the pause/play button
    carouselPausePlay.addEventListener("click", function (e) {
      if (carousel._isPaused) {
        unpauseCarousel();
      } else {
        pauseCarousel();
      }
    });

    // when a user interacts with the carousel using touch events, if the carousel is paused using the pause button, unpause it
    homePageCarousel.addEventListener("touchend", () => {
      if (carousel._isPaused) {
        unpauseCarousel();
      }
    });

    // when a user hovers over the prev/next buttons, add a hover class to the carousel item so the hover state doesn't get lost
    const carouselPrevNext = document.querySelectorAll(
      ".carousel-control-prev, .carousel-control-next"
    );
    if (carouselPrevNext) {
      carouselPrevNext.forEach((btn) => {
        btn.addEventListener("mouseover", () => {
          btn
            .closest(".carousel")
            .querySelectorAll(".carousel-item .carousel-link")
            .forEach((slide) => {
              slide.classList.add("hover");
            });
        });
        btn.addEventListener("mouseout", () => {
          btn
            .closest(".carousel")
            .querySelectorAll(".carousel-item .carousel-link")
            .forEach((slide) => {
              slide.classList.remove("hover");
            });
        });
      });
    }

    // start the carousel cycling
    carousel.cycle();
  }
});
