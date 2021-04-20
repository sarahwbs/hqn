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

  function openPopupModal(modal) {
    modal.setAttribute("aria-hidden", "false");
    modal.classList.add("d-block");
    modal.classList.remove("d-none");
    updateBodyHeightToMatchModal();
  }

  function closePopupModal(modal) {
    modal.setAttribute("aria-hidden", "true");
    modal.classList.add("d-none");
    modal.classList.remove("d-block");
    document.body.style.height = "auto";
  }

  // Clicking on the close button, background, cancel button will remove the popup modal from DOM
  const popupModals = document.querySelectorAll(".popup-modal");

  if (popupModals && popupModals.length) {
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

      if (popupModalCancelBtn) {
        popupModalCancelBtn.addEventListener("click", () =>
          closePopupModal(modal)
        );
      }
    });
  }

  // if the access modal is on the page, add an onclick event to either the "read now" button, the "watch movie" button, the "select bundle" button, or the game thumbnail link
  const subscriptionRequiredModal = document.querySelector(".modal-default");
  if (subscriptionRequiredModal) {
    const readNowButton = document.querySelector(".detail-view__read-button");
    const watchMovieButton = document.querySelector(
      ".detail-view__watch-movie-button"
    );
    const selectBundleButton = document.querySelector(
      ".bundle-detail-view__select-bundle-button"
    );
    const gameThumbnailLinks = document.querySelectorAll(".card-game__link");

    if (readNowButton) {
      readNowButton.addEventListener("click", () => {
        openPopupModal(subscriptionRequiredModal);
      });
    } else if (watchMovieButton) {
      watchMovieButton.addEventListener("click", () => {
        openPopupModal(subscriptionRequiredModal);
      });
    } else if (selectBundleButton) {
      selectBundleButton.addEventListener("click", () => {
        openPopupModal(subscriptionRequiredModal);
      });
    } else if (gameThumbnailLinks) {
      gameThumbnailLinks.forEach((link) => {
        link.addEventListener("click", () => {
          openPopupModal(subscriptionRequiredModal);
        });
      });
    }
  }

  // if the bundle selection modal is on the page, add an onclick event to the bundle selection button
  const bundleSelectionModal = document.querySelector(
    ".modal-bundle-selection"
  );
  const selectBundleButton = document.querySelector(
    ".bundle-detail-view__select-bundle-button"
  );
  if (bundleSelectionModal) {
    selectBundleButton.addEventListener("click", () => {
      openPopupModal(bundleSelectionModal);
    });
  }

  // if the delete subscription modal is on the page, add an onclick event to the delete subscription button
  const deleteSubscriptionModal = document.querySelector(
    ".modal-delete-subscription"
  );
  const deleteSubscriptionButton = document.querySelector(
    ".subscription-payment-view__delete-button"
  );
  if (deleteSubscriptionModal) {
    deleteSubscriptionButton.addEventListener("click", () => {
      openPopupModal(deleteSubscriptionModal);
    });
  }
});
