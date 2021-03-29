window.addEventListener("load", function () {
  if (document.querySelector(".select-dropdown-control")) {
    const selectOptionsMenu = document.querySelector(
      ".select-dropdown-control-menu"
    );
    const selectMenuBtn = document.querySelector(
      ".select-dropdown-control-btn"
    );
    const allOptions = selectOptionsMenu.querySelectorAll(".dropdown-item");
    const mainContentDiv = document.querySelector(".main-content");
    let activeOptionElement = allOptions[0];

    setActiveOption();
    attachClickEventsToAllOptions();
    stackElements();

    function setActiveOption() {
      let activeOpt = false;

      // Set the active option, if there is one.
      allOptions.forEach((option) => {
        if (option.hasAttribute("active")) {
          activeOpt = true;
          selectMenuBtn.innerText = option.innerText;
        }
      });

      if (!activeOpt) {
        // Set the first option as the default option if there's no action option.
        selectMenuBtn.innerText = activeOptionElement.innerText;
      }
    }

    function attachClickEventsToAllOptions() {
      allOptions.forEach((option) => {
        option.addEventListener("click", (event) => {
          event.preventDefault();
          selectMenuBtn.innerText = event.target.innerText;

          // Set element to active
          event.target.setAttribute("active", "active");
          // Remove active attr from all other non-active elements
          allOptions.forEach((option) => {
            if (
              option.getAttribute("val") !== event.target.getAttribute("val")
            ) {
              option.removeAttribute("active");
            }
          });

          if (mainContentDiv.hasAttribute("style")) {
            stackElements("removeStack");
          }
        });
      });
    }

    /**
     * This function will stack Bootstrap's dropdown elements on top of the main-content div in order
     * to fix an issue where the Bootstrap's dropdown will stack beneath the main content.
     */
    function stackElements(action) {
      if (action === "removeStack") {
        mainContentDiv.style.position = "static";
        mainContentDiv.style.zIndex = "unset";
      } else {
        selectMenuBtn.addEventListener("show.bs.dropdown", (event) => {
          mainContentDiv.style.position = "relative";
          mainContentDiv.style.zIndex = 0;
        });
      }
    }
  }
});
