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
          let container = ele.closest(".form__input");
          let errorField = ele;
          if (!container) {
            container = ele.closest(".form__select");
            if (container) {
              errorField = container.querySelector(
                ".select-dropdown-control-btn"
              );
            } else {
              container = ele.closest(".form-check");
              if (container) {
                errorField = container.querySelector(".form-check-input");
              }
            }
          }
          container.querySelector(".form__error").classList.remove("d-none");
          errorField.classList.add("form__error-border");
        });
      } else {
        elements.forEach((ele) => {
          let container = ele.closest(".form__input");
          let errorField = ele;
          if (!container) {
            container = ele.closest(".form__select");
            if (container) {
              errorField = container.querySelector(
                ".select-dropdown-control-btn"
              );
            } else {
              container = ele.closest(".form-check");
              if (container) {
                errorField = container.querySelector(".form-check-input");
              }
            }
          }
          container.querySelector(".form__error").classList.add("d-none");
          errorField.classList.remove("form__error-border");
        });
      }

      return errorState;
    }

    function validateFields(e) {
      e.preventDefault();

      let errors = false;

      // Email Validation
      const emailInput = e.srcElement.querySelector('input[type="email"]');
      const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (emailInput && !emailRegex.test(emailInput.value.toLowerCase())) {
        errors = toggleErrorState(emailInput, true);
      } else if (emailInput) {
        toggleErrorState(emailInput, false);
      }

      // Re-submit email validation
      const resubmitEmailInput = e.srcElement.querySelector(
        'input[id="profileEmailResubmit"]'
      );
      if (resubmitEmailInput && emailInput.value !== resubmitEmailInput.value) {
        errors = toggleErrorState(resubmitEmailInput, true);
      } else if (resubmitEmailInput) {
        toggleErrorState(resubmitEmailInput, false);
      }

      // Member agreement validation
      const memberAgreement = e.srcElement.querySelector(
        'input[id="memberAgreement"]'
      );
      if (memberAgreement && !memberAgreement.checked) {
        errors = toggleErrorState(memberAgreement, true);
      } else if (memberAgreement) {
        toggleErrorState(memberAgreement, false);
      }

      // Password Validation (Mock)
      const passwordInput = e.srcElement.querySelector(
        'input[id="confirmPassword"]'
      );
      if (passwordInput && passwordInput.value !== "test") {
        errors = toggleErrorState(passwordInput, true);
      } else if (passwordInput) {
        toggleErrorState(passwordInput, false);
      }

      // New Password Strength Validation
      const newPasswordInput = e.srcElement.querySelector(
        'input[id="newPassword"]'
      );
      const passwordRegex = /^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/g;
      if (newPasswordInput && !passwordRegex.test(newPasswordInput.value)) {
        errors = toggleErrorState(newPasswordInput, true);
      } else if (newPasswordInput) {
        toggleErrorState(newPasswordInput, false);
      }

      // New Password & Confirm Password Validation
      const confirmNewPasswordInput = e.srcElement.querySelector(
        'input[id="confirmNewPassword"]'
      );

      if (
        newPasswordInput &&
        confirmNewPasswordInput &&
        newPasswordInput.value !== confirmNewPasswordInput.value
      ) {
        errors = toggleErrorState(confirmNewPasswordInput, true);
      } else if (newPasswordInput && confirmNewPasswordInput) {
        toggleErrorState(confirmNewPasswordInput, false);
      }

      if (
        document.getElementById("validateBillingAddress") &&
        document
          .getElementById("validateBillingAddress")
          .getAttribute("value") === "true"
      ) {
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

        // State/Province Validation
        const stateInput = e.srcElement.querySelector('input[id="state"]');
        if (stateInput && !stateInput.value) {
          errors = toggleErrorState(stateInput, true);
        } else if (stateInput) {
          toggleErrorState(stateInput, false);
        }

        // Phone Validation
        const phoneInput = e.srcElement.querySelector('input[type="tel"]');
        const phoneRegex =
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if (phoneInput && !phoneRegex.test(phoneInput.value)) {
          errors = toggleErrorState(phoneInput, true);
        } else if (phoneInput) {
          toggleErrorState(phoneInput, false);
        }

        // US Zip Code Validation
        const zipInput = e.srcElement.querySelector('input[id="zipCode"]');
        const zipError = zipInput
          .closest(".form__input")
          .querySelector(".form__error");
        const zipRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
        const pcRegex = /[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d/;
        const provinces = [
          "AB",
          "BC",
          "MB",
          "NB",
          "NL",
          "NS",
          "NT",
          "NU",
          "ON",
          "PE",
          "QC",
          "SK",
          "YT",
        ];
        if (
          zipInput &&
          stateInput &&
          stateInput.value &&
          provinces.includes(stateInput.value)
        ) {
          zipError.innerHTML = "Please enter a valid postal code.";
          if (!pcRegex.test(zipInput.value)) {
            errors = toggleErrorState(zipInput, true);
          } else {
            toggleErrorState(zipInput, false);
          }
        } else if (zipInput && zipInput.value) {
          zipError.innerHTML = "Please enter a valid zip code.";
          if (!zipRegex.test(zipInput.value)) {
            errors = toggleErrorState(zipInput, true);
          } else {
            toggleErrorState(zipInput, false);
          }
        } else if (zipInput && !zipInput.value) {
          zipError.innerHTML = "Please enter a zip or postal code.";
          errors = toggleErrorState(zipInput, true);
        }
      }

      // First Name Validation
      const firstNameInput = e.srcElement.querySelector(
        'input[id="firstName"]'
      );
      if (firstNameInput && !firstNameInput.value) {
        errors = toggleErrorState(firstNameInput, true);
      } else if (firstNameInput) {
        toggleErrorState(firstNameInput, false);
      }

      // Last Name Validation
      const lastNameInput = e.srcElement.querySelector('input[id="lastName"]');
      if (lastNameInput && !lastNameInput.value) {
        errors = toggleErrorState(lastNameInput, true);
      } else if (lastNameInput) {
        toggleErrorState(lastNameInput, false);
      }

      // Date of Birth Validation
      const monthsDropdown = e.srcElement.querySelector(
        "button#select-dobMonthsDropdown"
      );
      const daysDropdown = e.srcElement.querySelector(
        "button#select-dobDaysDropdown"
      );
      const yearsDropdown = e.srcElement.querySelector(
        "button#select-dobYearsDropdown"
      );
      if (monthsDropdown && daysDropdown && yearsDropdown) {
        const day = daysDropdown.innerText;
        const month = getMonthNumber(monthsDropdown.innerText);
        const year = yearsDropdown.innerText;
        const dobError = monthsDropdown
          .closest(".form__input")
          .querySelector(".form__error");

        if (!isValidDate(day, month, year)) {
          dobError.innerHTML = "Please enter a valid date of birth.";
          errors = toggleErrorState(
            [daysDropdown, monthsDropdown, yearsDropdown],
            true
          );
        } else if (!isOldEnough(day, month, year)) {
          dobError.innerHTML = "You must be 18 years of age or above.";
          errors = toggleErrorState(
            [daysDropdown, monthsDropdown, yearsDropdown],
            true
          );
        } else {
          toggleErrorState(
            [daysDropdown, monthsDropdown, yearsDropdown],
            false
          );
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

  // Show/hide toggle for password fields
  const passwordToggleInputs = document.querySelectorAll(
    '.form__input input[data-password-toggle="true"]'
  );

  if (passwordToggleInputs && passwordToggleInputs.length) {
    passwordToggleInputs.forEach((passwordInput) => {
      const toggleButton = passwordInput.parentNode.querySelector(
        ".form__input-password-toggle"
      );

      function togglePasswordVisibility() {
        if (passwordInput.getAttribute("type") === "text") {
          passwordInput.setAttribute("type", "password");
          toggleButton.innerText = "Show";
        } else {
          passwordInput.setAttribute("type", "text");
          toggleButton.innerText = "Hide";
        }
      }

      toggleButton.addEventListener("click", togglePasswordVisibility);
    });
  }

  // New Password Strength Validation
  const newPasswordInput = document.querySelector('input[id="newPassword"]');
  const passwordStrengthElement = document.querySelector(
    ".form__password-strength"
  );
  if (newPasswordInput && passwordStrengthElement) {
    // Removes all of the password strength visuals
    function resetPasswordLevels() {
      passwordStrengthElement.classList.remove(
        "level-1",
        "level-2",
        "level-3",
        "level-4"
      );
    }

    // Update the password strength visual element based on checks
    // (Low: 6 Chars | Fair: 8 Chars, 1 lowercase, 1 uppercase, 1 number | Good: Fair + 3 of lowercase/uppercase/number/special character | Excellent: Good + 10 chars + no repeated chars)
    function updatePasswordStrength() {
      const newPass = newPasswordInput.value;
      const passLen = newPass.length;
      const lowercaseRegex = /[a-z]/;
      const uppercaseRegex = /[A-Z]/;
      const numberRegex = /[0-9]/;
      const specialCharRegex = /[!@#$%^&*]/;
      const repeatedCharRegex = /(.)\1{2,}/;

      const hasLower = lowercaseRegex.test(newPass);
      const hasUpper = uppercaseRegex.test(newPass);
      const hasNumber = numberRegex.test(newPass);
      const hasSpecial = specialCharRegex.test(newPass);
      const hasRepeated = repeatedCharRegex.test(newPass);

      const minCharTypes = hasLower && hasUpper && hasNumber;
      const charTypeCount = hasLower + hasUpper + hasNumber + hasSpecial;

      if (passLen >= 10 && charTypeCount >= 3 && !hasRepeated) {
        resetPasswordLevels();
        passwordStrengthElement.classList.add("level-4");
        passwordStrengthElement.querySelector(".body-copy").innerText =
          "Password Strength: Excellent";
      } else if (passLen >= 8 && charTypeCount >= 3) {
        resetPasswordLevels();
        passwordStrengthElement.classList.add("level-3");
        passwordStrengthElement.querySelector(".body-copy").innerText =
          "Password Strength: Good";
      } else if (passLen >= 8 && minCharTypes) {
        resetPasswordLevels();
        passwordStrengthElement.classList.add("level-2");
        passwordStrengthElement.querySelector(".body-copy").innerText =
          "Password Strength: Fair";
      } else if (passLen >= 6) {
        resetPasswordLevels();
        passwordStrengthElement.classList.add("level-1");
        passwordStrengthElement.querySelector(".body-copy").innerText =
          "Password Strength: Low";
      } else if (passLen >= 1) {
        resetPasswordLevels();
        passwordStrengthElement.querySelector(".body-copy").innerText =
          "Password Strength: None";
      } else {
        resetPasswordLevels();
        passwordStrengthElement.querySelector(".body-copy").innerText =
          "Password Strength: ";
      }
    }

    newPasswordInput.addEventListener("input", updatePasswordStrength);
    updatePasswordStrength();
  }
});
