window.addEventListener("load", function () {
  // Clicking on the close button will remove the popup modal from DOM
  var popupModal = document.querySelector(".popup-modal");
  var popupModalCloseBtn = document.querySelector(".popup-modal__btn-close");

  if (popupModal) {
    function closePopupModal() {
      popupModal.setAttribute("aria-hidden", "true");
      popupModal.classList.add("d-none");
    }

    popupModalCloseBtn.addEventListener("click", closePopupModal);
  }
});
