window.addEventListener("load", function () {
  const searchBox = document.querySelector(".search-box");

  if (searchBox) {
    const searchInput = document.querySelector(".search-box-text");
    const closeSearchButton = document.querySelector(".search-box__btn-close");

    searchInput.addEventListener("input", () => {
      if (searchInput.value !== "") {
        searchBox.classList.add("searching");
      } else {
        searchBox.classList.remove("searching");
      }
    });

    closeSearchButton.addEventListener("click", () => {
      searchInput.value = "";
      searchBox.classList.remove("searching");
    });
  }
});
