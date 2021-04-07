window.addEventListener("load", function () {
  // Show loader if there is more content to load
  const loaderElement = document.querySelector(".loader");

  // This will need to be updated to add additional conditional on when to show the loader
  // Currently, it will show the loader if the user scrolls to 75-80% of the screen
  if (loaderElement) {
    const mainElement = document.body.querySelector(".main");

    function showLoaderComponent() {
      if (
        window.innerHeight + mainElement.scrollTop >=
          mainElement.scrollHeight - window.innerHeight / 3 &&
        !loaderElement.classList.contains("active")
      ) {
        loaderElement.classList.add("active");
      }
    }

    mainElement.addEventListener("scroll", showLoaderComponent);
  }
});
