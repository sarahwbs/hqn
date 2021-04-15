window.addEventListener("load", function () {
  // look for the carousel
  const homePageCarousel = document.querySelector("#homePageCarousel");

  if (homePageCarousel) {
    // if it exists, initialize the carousel
    const carousel = new bootstrap.Carousel(homePageCarousel, {
      interval: 3000,
    });

    // when the slide updates, change the text in the live region for screen readers
    homePageCarousel.addEventListener("slide.bs.carousel", function (e) {
      const liveregion = homePageCarousel.querySelector(".liveregion");
      const slides = homePageCarousel.querySelectorAll(".carousel-item");
      liveregion.textContent = "Slide " + (e.to + 1) + " of " + slides.length;
    });

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
