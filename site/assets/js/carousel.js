window.addEventListener("load", function () {
  // look for the carousel
  const homePageCarousel = document.querySelector("#homePageCarousel");

  if (homePageCarousel) {
    // if it exists, initialize the carousel
    const carouselContainer = homePageCarousel.closest(".cta-carousel");
    const carouselInner = homePageCarousel.querySelector(".carousel-inner");
    const carousel = new bootstrap.Carousel(homePageCarousel, {
      interval: 3000,
    });
    const carouselPausePlay = document.querySelector(".carousel-pause");
    const pausePlayText = carouselPausePlay.querySelector("span");

    function pauseCarousel(pauseSource) {
      if (pauseSource && pauseSource === "pause-play") {
        carouselPausePlay.classList.remove("carousel-pause");
        carouselPausePlay.classList.add("carousel-play");
      }
      carousel.pause();
      pausePlayText.innerHTML = "Play";
      carouselPausePlay.setAttribute("aria-label", "Play");
      carouselPausePlay.setAttribute("data-action", "start");
    }

    function unpauseCarousel(pauseSource) {
      if (
        pauseSource &&
        (pauseSource === "pause-play" || pauseSource === "touchend")
      ) {
        carouselPausePlay.classList.add("carousel-pause");
        carouselPausePlay.classList.remove("carousel-play");
      }

      if (pauseSource && pauseSource === "pause-play") {
        // go to the next slide immediately before unpausing
        carousel.next();
      }

      carousel.cycle();
      pausePlayText.innerHTML = "Pause";
      carouselPausePlay.setAttribute("aria-label", "Pause");
      carouselPausePlay.setAttribute("data-action", "stop");
    }

    // when the slide updates, change the text in the live region for screen readers
    homePageCarousel.addEventListener("slide.bs.carousel", function (e) {
      const liveregion = carouselContainer.querySelector(".liveregion");
      const slides = homePageCarousel.querySelectorAll(".carousel-item");
      const currentSlide = e.from + 1;
      const nextSlide = e.to + 1;
      const currentDot = carouselContainer.querySelector(
        ".carousel-dot-" + currentSlide
      );
      const nextDot = carouselContainer.querySelector(
        ".carousel-dot-" + nextSlide
      );
      currentDot.classList.remove("active");
      nextDot.classList.add("active");
      liveregion.textContent = "Slide " + nextSlide + " of " + slides.length;
    });

    // add pause/play functionality to the pause/play button
    carouselPausePlay.addEventListener("click", function () {
      if (carousel.touchTimeout) {
        clearTimeout(carousel.touchTimeout);
      }

      if (carousel._isPaused) {
        unpauseCarousel("pause-play");
      } else {
        pauseCarousel("pause-play");
      }
    });

    // when a user interacts with the carousel using touch events, if the carousel is paused using the pause button, unpause it
    homePageCarousel.addEventListener("touchend", () => {
      if (carousel._isPaused) {
        unpauseCarousel("touchend");
      }
    });

    // when a slide receives keyboard focus, if the carousel isn't paused, pause it, when it loses focus, if it was paused due to focus, unpause it
    const carouselSlideLinks = homePageCarousel.querySelectorAll(
      ".carousel-link"
    );
    carouselSlideLinks.forEach((slide) => {
      slide.addEventListener("focus", () => {
        if (!carousel._isPaused) {
          homePageCarousel.classList.add("focus-paused");
          carouselInner.classList.add("hover");
          pauseCarousel();
        }
      });
      slide.addEventListener("focusout", (e) => {
        if (homePageCarousel.classList.contains("focus-paused")) {
          homePageCarousel.classList.remove("focus-paused");
          carouselInner.classList.remove("hover");
          unpauseCarousel();
        }
      });
    });

    // when a user hovers over the prev/next buttons, add a hover class to the carousel item so the hover state doesn't get lost
    const carouselPrevNext = document.querySelectorAll(
      ".carousel-control-prev, .carousel-control-next"
    );
    if (carouselPrevNext) {
      carouselPrevNext.forEach((btn) => {
        btn.addEventListener("mouseover", () => {
          carouselInner.classList.add("hover");
        });
        btn.addEventListener("mouseout", () => {
          carouselInner.classList.remove("hover");
          btn.blur();
        });
      });
    }

    // start the carousel cycling
    carousel.cycle();
  }
});
