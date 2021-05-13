window.addEventListener("load", function () {
  const filterButton = document.querySelector(
    ".filter-sort-btns__filter-button"
  );
  if (filterButton) {
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
    const allAccordionButtons = document.querySelectorAll(".accordion-button");
    const allCheckboxes = document.querySelectorAll(
      ".filter-button-control__checkboxes input[type=checkbox]"
    );

    function setCloseFilterOnOutsideClick() {
      document.addEventListener("mouseup", function (e) {
        // if the target of the click isn't the filter drop down, or a descendant of the filter drop down, collapse the filter drop down
        if (
          filterCollapsible !== e.target &&
          !filterCollapsible.contains(e.target)
        ) {
          bsFilterCollapsible.hide();
        }
      });
    }

    function setCloseFilterOnKeyOut() {
      const filterContainer = filterButton.closest(".filter-button-control");

      filterContainer.addEventListener("focusout", function (e) {
        if (!filterContainer.contains(e.relatedTarget)) {
          bsFilterCollapsible.hide();
        }
      });
    }

    function setCloseButtonEventHandler() {
      closeButton.addEventListener("click", () => {
        bsFilterCollapsible.hide();
        filterButton.focus();
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

    function focusOnAccordionOpen() {
      allAccordionButtons.forEach((accordionBtn) => {
        accordionBtn.addEventListener("click", () => {
          accordionBtn.focus();
        });

        accordionBtn.addEventListener("keydown", (e) => {
          if (e.keyCode == 13 || e.keyCode == 32) {
            e.stopPropagation();
            window.setTimeout(() => {
              accordionBtn.focus();
            }, 0);
          }
        });
      });
    }

    function enterToCheck() {
      allCheckboxes.forEach((chkbox) => {
        chkbox.addEventListener("keydown", (e) => {
          if (e.keyCode == 13 || e.keyCode == 32) {
            e.preventDefault();
            e.stopPropagation();
            chkbox.checked = chkbox.checked ? false : true;
          }
        });
      });
    }

    setCloseButtonEventHandler();
    setClearFiltersButtonEventHandler();
    stackElements();
    setCloseFilterOnOutsideClick();
    setCloseFilterOnKeyOut();
    focusOnAccordionOpen();
    enterToCheck();
  }
});
