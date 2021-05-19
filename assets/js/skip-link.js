window.addEventListener("load", function () {
  // when a slide receives keyboard focus, if the carousel isn't paused, pause it, when it loses focus, if it was paused due to focus, unpause it
  const skipLinks = document.querySelectorAll(".skip-nav");
  skipLinks.forEach((skipLink) => {
    // skipLink.addEventListener("click", () => {
    //   document.querySelector("#main").focus();
    // });
    skipLink.addEventListener("focus", () => {
      alert("hi...");
      skipLink.classList.add("focus");
    });
    skipLink.addEventListener("blur", () => {
      skipLink.classList.remove("focus");
    });
  });
});
