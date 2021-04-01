window.addEventListener("load", function () {
  // look for the subscription options
  const subscriptionOptions = document.querySelector(".subscription-options");

  if (subscriptionOptions) {
    subscriptionOptionButtons = subscriptionOptions.querySelectorAll(
      ".subscription-option__button"
    );
    subscriptionOptionButtons.forEach((subscriptionOptionButton) => {
      subscriptionOptionButton.addEventListener("click", function (e) {
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
      });
    });
  }
});
