window.addEventListener("load", function () {
  const bundleDetailPage = document.querySelector(".bundle-detail-view");

  if (bundleDetailPage) {
    // Show/Hide the descriptions when the `read more` button is clicked
    const readMoreButtons = document.querySelectorAll(
      ".bundle-detail-view__read-more-button button"
    );

    if (readMoreButtons && readMoreButtons.length) {
      readMoreButtons.forEach((button) => {
        function toggleBundleDetailDescription(e) {
          const bundleDetailDescriptionContainer = e.target
            .closest(".bundle-detail-view_info")
            .querySelector(".bundle-detail-view__description");
          const additionalBundleDetailDescription = e.target
            .closest(".bundle-detail-view_info")
            .querySelector(".bundle-detail-view__hidden-description");

          additionalBundleDetailDescription.classList.toggle(
            "show-description"
          );
          bundleDetailDescriptionContainer.classList.toggle(
            "show-all-description"
          );

          if (
            additionalBundleDetailDescription.classList.contains(
              "show-description"
            )
          ) {
            button.innerHTML = "Read Less";
          } else {
            button.innerHTML = "Read More";
          }
        }

        button.addEventListener("click", toggleBundleDetailDescription);
      });
    }
  }
});
