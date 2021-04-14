window.addEventListener("load", function () {
  if (document.querySelector(".detail-view")) {
    if (
      document.querySelector(
        ".detail-view__controls .detail-view__mark-button "
      )
    ) {
      // Update buttons when mark as complete is clicked
      function toggleBookComplete() {
        const progressBar = document.querySelector(
          ".detail-view__progress .progress-bar"
        );
        const bookProgress = progressBar.getAttribute("aria-valuenow");
        const percentReadText = document.querySelector(
          ".detail-view__progress p"
        );
        const markReadButton = document.querySelector(
          ".detail-view__controls .detail-view__mark-button"
        );
        const readBookButton = document.querySelector(
          ".detail-view__controls .detail-view__read-button"
        );

        if (bookProgress < 100) {
          progressBar.setAttribute("aria-valuenow", 100);
          progressBar.style.width = "100%";
          percentReadText.innerText = "100% of Book Read";
          markReadButton.classList.add("checked-button", "white");
          markReadButton.innerText = "I've Read This!";
          readBookButton.innerText = "Continue Reading";
        } else {
          progressBar.setAttribute("aria-valuenow", 0);
          progressBar.style.width = "0%";
          percentReadText.innerText = "0% of Book Read";
          markReadButton.classList.remove("checked-button", "white");
          markReadButton.innerText = "Mark as Read";
          readBookButton.innerText = "Read Now";
        }
      }

      document
        .querySelector(".detail-view__controls .detail-view__mark-button")
        .addEventListener("click", toggleBookComplete);
    }

    // Shift the progress bar and action buttons into another column for mobile
    // (This cannot be done via CSS order as the description is within a part of a column)
    function shiftProgressBarAndActionButtons() {
      const detailDescription = document.querySelector(
        ".detail-view__description"
      );

      if (
        window.innerWidth < 992 &&
        document.querySelector(
          ".detail-view .detail-view_col-2 .detail-view__description"
        )
      ) {
        // Shifts the description to bottom of the page
        document
          .querySelector(".detail-view .detail-view_col-3")
          .appendChild(detailDescription);
      } else if (
        window.innerWidth >= 992 &&
        document.querySelector(
          ".detail-view .detail-view_col-3 .detail-view__description"
        )
      ) {
        // Shifts the description to the middle column
        document
          .querySelector(".detail-view .detail-view_col-2 .detail-view_info")
          .appendChild(detailDescription);
      }
    }

    window.addEventListener("resize", shiftProgressBarAndActionButtons);
    shiftProgressBarAndActionButtons();
  }
});
