window.addEventListener("load", function () {
  if (document.querySelector(".select-dropdown-control")) {
    const selectMenuBtns = document.querySelectorAll(
      ".select-dropdown-control-btn"
    );
    const selectOptionsMenus = document.querySelectorAll(
      ".select-dropdown-control-menu"
    );
    const mainContentDiv = document.querySelector(".main-content");
    let screenAspect =
      window.innerWidth / window.innerHeight > 1 ? "landscape" : "portrait";

    /**
     * Set 'active' class for the relevant option on all the dropdowns on the page.
     */
    function setActiveOption() {
      selectOptionsMenus.forEach((dropdownMenu) => {
        let activeOpt = false;
        let allOptions = dropdownMenu.querySelectorAll(".dropdown-item");
        let activeOptionElement = allOptions[0];
        let associatedButton = document.querySelector(
          `.select-dropdown-control-btn[id=${dropdownMenu.getAttribute(
            "aria-labelledby"
          )}]`
        );
        let associatedInput = dropdownMenu.parentNode.querySelector(
          "input[type=hidden]"
        );

        // Set the active option, if there is one.
        allOptions.forEach((option) => {
          if (option.getAttribute("data-active") === "true") {
            activeOpt = true;
            associatedButton.innerHTML = option.innerHTML;
            associatedInput.setAttribute(
              "value",
              option.getAttribute("data-val")
            );
          }
        });

        if (!activeOpt) {
          // Set the first option as the default option if there's no active option.
          associatedButton.innerHTML = activeOptionElement.innerHTML;
          associatedInput.setAttribute("value", "");
        }
      });
    }

    /**
     * Attach click event handlers to all the options on all the dropdowns on the page.
     */
    function attachClickEventsToAllOptions() {
      selectOptionsMenus.forEach((dropdownMenu) => {
        let allOptions = dropdownMenu.querySelectorAll(".dropdown-item");
        let associatedButton = document.querySelector(
          `.select-dropdown-control-btn[id=${dropdownMenu.getAttribute(
            "aria-labelledby"
          )}]`
        );
        let associatedInput = dropdownMenu.parentNode.querySelector(
          "input[type=hidden]"
        );

        allOptions.forEach((option) => {
          option.addEventListener("click", (event) => {
            event.preventDefault();
            associatedButton.innerHTML = event.target.innerHTML;
            associatedInput.setAttribute(
              "value",
              event.target.getAttribute("data-val")
            );

            // Set element to active
            event.target.setAttribute("data-active", "true");
            event.target.classList.add("active");
            // Remove active attr from all other non-active elements
            allOptions.forEach((opt) => {
              if (
                parseInt(opt.getAttribute("data-val"), 10) !==
                parseInt(event.target.getAttribute("data-val"), 10)
              ) {
                opt.setAttribute("data-active", "false");
                opt.classList.remove("active");
              }
            });

            if (mainContentDiv && mainContentDiv.hasAttribute("style")) {
              stackElements("removeStack");
            }
          });
        });
      });
    }

    /**
     * This function will stack Bootstrap's dropdown elements on top of the main-content div in order
     * to fix an issue where the Bootstrap's dropdown would stack beneath the main content.
     */
    function stackElements(action) {
      if (document.body.contains(mainContentDiv)) {
        if (action === "removeStack") {
          mainContentDiv.style.position = "static";
          mainContentDiv.style.zIndex = "unset";
        } else {
          selectMenuBtns.forEach((btn) => {
            btn.addEventListener("show.bs.dropdown", () => {
              mainContentDiv.style.position = "relative";
              mainContentDiv.style.zIndex = 0;
            });
          });
        }
      }
    }

    function focusOnClose() {
      selectMenuBtns.forEach((selectMenuBtn) => {
        selectMenuBtn.addEventListener("hide.bs.dropdown", () => {
          selectMenuBtn.focus();
        });
      });
    }

    /**
     * Hide and re-show the dropdown on rotate (i.e. when the screen resizes and the aspect ratio changes), ensuring that the dropdown appears in the correct position.
     */
    function fixDropdowns() {
      const newScreenAspect =
        window.innerWidth / window.innerHeight > 1 ? "landscape" : "portrait";

      selectMenuBtns.forEach((btn) => {
        const selectMenu = new bootstrap.Dropdown(btn);
        if (
          btn.classList.contains("show") &&
          screenAspect !== newScreenAspect
        ) {
          selectMenu.hide();
          // setTimeout is required here to ensure the menu is re-shown after the resize is complete
          window.setTimeout(() => {
            selectMenu.show();
          }, 0);
        }
      });

      screenAspect = newScreenAspect;
    }
    window.addEventListener("resize", fixDropdowns);

    setActiveOption();
    attachClickEventsToAllOptions();
    stackElements();
    focusOnClose();
  }
});
