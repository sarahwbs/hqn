window.addEventListener("load", function () {
  // look for the subscription options
  const subscriptionOptions = document.querySelector(".subscription-options");

  if (subscriptionOptions) {
    subscriptionOptionButtons = subscriptionOptions.querySelectorAll(
      ".subscription-option__button"
    );

    function selectSubscriptionOption(subscriptionOptionButton) {
      subscriptionOptionButtons.forEach((button) => {
        const subscriptionOption = button.closest(".subscription-option");
        if (subscriptionOptionButton === button) {
          button.classList.add("checked-button");
          subscriptionOption.classList.add("selected");
        } else {
          button.classList.remove("checked-button");
          subscriptionOption.classList.remove("selected");
        }
      });
    }

    subscriptionOptionButtons.forEach((subscriptionOptionButton) => {
      subscriptionOptionButton.addEventListener("click", () => {
        selectSubscriptionOption(subscriptionOptionButton);
      });

      const subscriptionOptionCheckBox = subscriptionOptionButton
        .closest(".subscription-option__select")
        .querySelector(".subscription-option__checkmark");

      subscriptionOptionCheckBox.addEventListener("change", () => {
        alert("hi");
        selectSubscriptionOption(subscriptionOptionButton);
      });

      // subscriptionOptionButton.addEventListener("touchstart", () => {
      //   selectSubscriptionOption(subscriptionOptionButton);
      // });

      subscriptionOptionButton.addEventListener("keydown", (e) => {
        if (e.keyCode == 13 || e.keyCode == 32) {
          e.preventDefault();
          e.stopPropagation();
          selectSubscriptionOption(subscriptionOptionButton);
        }
      });
    });
  }
});
