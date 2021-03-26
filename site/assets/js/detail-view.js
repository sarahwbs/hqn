window.onload = function () {
  if (document.querySelector(".detail-view")) {
    if (
      document.querySelector(
        ".detail-view__controls .detail-view__mark-button "
      )
    ) {
      // Update buttons when mark as complete is clicked
      function markBookAsComplete() {
        document.querySelector(".detail-view__progress p").innerText =
          "100% OF BOOK READ";
        document.querySelector(
          ".detail-view__progress .progress-bar"
        ).style.width = "100%";
        document
          .querySelector(".detail-view__controls .detail-view__mark-button")
          .classList.add("checked-button", "white");
        document.querySelector(
          ".detail-view__controls .detail-view__mark-button"
        ).innerText = "I've Read This!";
        document.querySelector(
          ".detail-view__controls .detail-view__read-button"
        ).innerText = "Continue Reading";
      }

      document
        .querySelector(".detail-view__controls .detail-view__mark-button")
        .addEventListener("click", markBookAsComplete);
    }

    // Shift the progress bar and action buttons into another column for mobile
    // (This cannot be done via CSS order as the description is within a part of a column)
    function shiftProgressBarAndActionButtons() {
      var detailDescription = document.querySelector(
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
};
