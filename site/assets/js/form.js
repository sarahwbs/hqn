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

      // Address Validation
      const addressInput = e.srcElement.querySelector(
        'input[id="streetAddress"]'
      );
      if (addressInput && !addressInput.value) {
        errors = toggleErrorState(addressInput, true);
      } else if (addressInput) {
        toggleErrorState(addressInput, false);
      }

      // City Validation
      const cityInput = e.srcElement.querySelector('input[id="city"]');
      if (cityInput && !cityInput.value) {
        errors = toggleErrorState(cityInput, true);
      } else if (cityInput) {
        toggleErrorState(cityInput, false);
      }

      const phoneInput = e.srcElement.querySelector('input[type="tel"]');
      const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      if (phoneInput && !phoneRegex.test(phoneInput.value)) {
        errors = toggleErrorState(phoneInput, true);
      } else if (phoneInput) {
        toggleErrorState(phoneInput, false);
      }

      // US Zip Code Validation
      const zipInput = e.srcElement.querySelector('input[id="zipCode"]');
      const zipRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
      if (zipInput && !zipRegex.test(zipInput.value)) {
        errors = toggleErrorState(zipInput, true);
      } else if (zipInput) {
        toggleErrorState(zipInput, false);
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
