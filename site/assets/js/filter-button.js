window.addEventListener("load", function () {
  if (document.querySelector(".filter-sort-btns__filter-button")) {
    const mainContentDiv = document.querySelector(".main-content");
    const filterCollapsible = document.querySelector(
      ".filter-button-control__collapse"
    );
    const bsFilterCollapsible = new bootstrap.Collapse(filterCollapsible, {
      toggle: false,
    });
    const closeButton = document.querySelector(
      ".filter-button-control__btn-close"
    );
    const clearFiltersButton = document.querySelector(
      ".filter-button-control__btn-clear"
    );
    const allCheckboxes = document.querySelectorAll(
      ".filter-button-control__checkboxes input[type=checkbox]"
    );

    function setCloseButtonEventHandler() {
      // TODO: change css transition to @include transition($transition-collapse);
      closeButton.addEventListener("click", () => {
        bsFilterCollapsible.hide();
      });
    }

    function setClearFiltersButtonEventHandler() {
      clearFiltersButton.addEventListener("click", () => {
        allCheckboxes.forEach((chkbox) => {
          chkbox.checked = false;
        });
      });
    }

    /**
     * This function will stack Bootstrap's collapsible elements on top of the main-content div in order
     * to fix an issue where the Bootstrap's collapsible would stack beneath the main content.
     */
    function stackElements(action) {
      if (document.body.contains(mainContentDiv)) {
        if (action === "removeStack") {
          mainContentDiv.style.position = "static";
          mainContentDiv.style.zIndex = "unset";
        } else {
          filterCollapsible.addEventListener("show.bs.collapse", () => {
            mainContentDiv.style.position = "relative";
            mainContentDiv.style.zIndex = 0;
          });
        }
      }
    }

    setCloseButtonEventHandler();
    setClearFiltersButtonEventHandler();
    stackElements();
  }
});
