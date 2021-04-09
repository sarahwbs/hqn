window.addEventListener("load", function () {
  // Checks validation of the form
  const forms = document.querySelectorAll("form");

  if (forms && forms.length) {
    function toggleErrorState(elements, errorState) {
      // Check if it's a single element
      if (!Array.isArray(elements)) {
        elements = [elements];
      }

      if (errorState) {
        elements.forEach((ele) => {
          ele
            .closest(".form__input")
            .querySelector(".form__error")
            .classList.remove("d-none");
          ele.classList.add("form__error-border");
        });
      } else {
        elements.forEach((ele) => {
          ele
            .closest(".form__input")
            .querySelector(".form__error")
            .classList.add("d-none");
          ele.classList.remove("form__error-border");
        });
      }

      return errorState;
    }

    function validateFields(e) {
      e.preventDefault();

      let errors = false;

      // Email Validation
      const emailInput = e.srcElement.querySelector('input[type="email"]');
      const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (emailInput && !emailRegex.test(emailInput.value.toLowerCase())) {
        errors = toggleErrorState(emailInput, true);
      } else if (emailInput) {
        toggleErrorState(emailInput, false);
      }

      // Password Validation (Mock)
      const passwordInput = e.srcElement.querySelector(
        'input[type="password"]'
      );
      if (passwordInput && passwordInput.value !== "test") {
        errors = toggleErrorState(passwordInput, true);
      } else if (passwordInput) {
        toggleErrorState(passwordInput, false);
      }

      // Date of Birth Validation
      const monthsDropdown = e.srcElement.querySelector(
        "button#dobMonthsDropdown"
      );
      const daysDropdown = e.srcElement.querySelector("button#dobDaysDropdown");
      const yearsDropdown = e.srcElement.querySelector(
        "button#dobYearsDropdown"
      );
      if (monthsDropdown && daysDropdown && yearsDropdown) {
        const day = daysDropdown.innerText;
        const month = getMonthNumber(monthsDropdown.innerText);
        const year = yearsDropdown.innerText;

        if (!isValidDate(day, month, year)) {
          errors = toggleErrorState(
            [daysDropdown, monthsDropdown, yearsDropdown],
            true
          );
        } else {
          toggleErrorState([daysDropdown, monthsDropdown, yearsDropdown], false);
        }
      }

      // Submit the form if there are no errors
      if (!errors) {
        e.target.submit();
      }
    }

    forms.forEach((form) => {
      form.addEventListener("submit", validateFields);
    });
  }
});
