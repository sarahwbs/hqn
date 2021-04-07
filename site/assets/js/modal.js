window.addEventListener("load", function () {
  // Clicking on the close button, background, cancel button will remove the popup modal from DOM
  const popupModals = document.querySelectorAll(".popup-modal");

  if (popupModals && popupModals.length) {
    function closePopupModal(modal) {
      modal.setAttribute("aria-hidden", "true");
      modal.classList.add("d-none");
    }

    popupModals.forEach((modal) => {
      const popupModalCloseBtn = modal.querySelector(".popup-modal__btn-close");
      const popupModalBackground = modal.querySelector(
        ".popup-modal__background"
      );
      const popupModalCancelBtn = modal.querySelector(
        ".popup-modal__cancel-button"
      );

      popupModalCloseBtn.addEventListener("click", () =>
        closePopupModal(modal)
      );

      popupModalBackground.addEventListener("click", () =>
        closePopupModal(modal)
      );

      popupModalCancelBtn.addEventListener("click", () =>
        closePopupModal(modal)
      );
    });
  }
});
