window.addEventListener("load", function () {
  if (document.querySelector(".filter-button-control")) {
    const mainContentDiv = document.querySelector(".main-content");
    const filterBtn = document.querySelector(
      ".filter-sort-btns__filter-button"
    );

    function stackElements(action) {
      if (document.body.contains(mainContentDiv)) {
        if (action === "removeStack") {
          mainContentDiv.style.position = "static";
          mainContentDiv.style.zIndex = "unset";
        } else {
          filterBtn.addEventListener("show.bs.collapse", () => {
            mainContentDiv.style.position = "relative";
            mainContentDiv.style.zIndex = 0;
          });
        }
      }
    }

    // stackElements();
  }
});
