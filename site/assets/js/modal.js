window.addEventListener("load", function () {
  // Update the height of the html to match the height of the visible modal
  function updateBodyHeightToMatchModal() {
    const visibleModalHeight = document.querySelector(
      '.popup-modal[aria-hidden="false"] .popup-modal__container'
    );

    if (visibleModalHeight) {
      document.body.style.height = `${visibleModalHeight.clientHeight}px`;
    }
  }

  updateBodyHeightToMatchModal();
  window.addEventListener("resize", updateBodyHeightToMatchModal);

  // Clicking on the close button, background, cancel button will remove the popup modal from DOM
  const popupModals = document.querySelectorAll(".popup-modal");

  if (popupModals && popupModals.length) {
    function closePopupModal(modal) {
      modal.setAttribute("aria-hidden", "true");
      modal.classList.add("d-none");
      document.body.style.height = "auto";
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
