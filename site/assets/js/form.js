window.addEventListener("load", function () {
  // Checks validation of the form
  const forms = document.querySelectorAll("form");

  if (forms && forms.length) {
    function toggleErrorState(element, errorState) {
      if (errorState) {
        element
          .closest(".form__input")
          .querySelector(".form__error")
          .classList.remove("d-none");
        element.classList.add("form__error-border");
      } else {
        element
          .closest(".form__input")
          .querySelector(".form__error")
          .classList.add("d-none");
        element.classList.remove("form__error-border");
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
      } else {
        toggleErrorState(emailInput, false);
      }

      // Password Validation (Mock)
      const passwordInput = e.srcElement.querySelector(
        'input[type="password"]'
      );
      if (passwordInput.value !== "test") {
        errors = toggleErrorState(passwordInput, true);
      } else {
        toggleErrorState(passwordInput, false);
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
