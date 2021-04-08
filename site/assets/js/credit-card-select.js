window.addEventListener("load", function () {
  const ccOptions = document.querySelector(".change-subscription");

  if (ccOptions) {
    ccOptionCheckboxes = ccOptions.querySelectorAll(".form-check-input");
    ccOptionCheckboxes.forEach((ccOptionCheckbox) => {
      ccOptionCheckbox.addEventListener("click", function (e) {
        if (!ccOptionCheckbox.checked) {
          e.preventDefault();
          return;
        }
        ccOptionCheckboxes.forEach((checkbox) => {
          const ccOption = checkbox.closest(".credit-card");
          if (ccOptionCheckbox === checkbox) {
            checkbox.checked = true;
            ccOption.classList.add("current");
          } else {
            checkbox.checked = false;
            ccOption.classList.remove("current");
          }
        });
      });
    });
  }
});
