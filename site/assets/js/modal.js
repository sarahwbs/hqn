window.onload = function () {
  // Clicking on the close button will remove the popup modal from DOM
  var popupModal = document.querySelector(".popup-modal");
  var popupModalCloseBtn = document.querySelector(".popup-modal__btn-close");

  if (popupModal) {
    function closePopupModal() {
      popupModal.remove();
    }

    popupModalCloseBtn.addEventListener("click", closePopupModal);
  }
};
