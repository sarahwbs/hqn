window.addEventListener("load", function () {
  if (document.querySelector(".select-dropdown-control")) {
    const selectOptionsMenu = document.querySelector(
      ".select-dropdown-control-menu"
    );
    const selectMenuBtn = document.querySelector(
      ".select-dropdown-control-btn"
    );
    const allOptions = selectOptionsMenu.querySelectorAll(".dropdown-item");
    let activeOptionElement = allOptions[0];

    setActiveOption();
    attachClickEventsToAllOptions();

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
        });
      });
    }
  }
});
