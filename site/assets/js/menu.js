window.addEventListener("load", function () {
  const menuHeaderDesktop = document.querySelector(".header__dropdown-menu");
  const menuMainMobile = document.querySelector("#mainMenuModal");
  const menuAccountMobile = document.querySelector("#userAccountMenuModal");

  if (menuHeaderDesktop && menuMainMobile && menuAccountMobile) {
    const headerAccountMenu = menuHeaderDesktop.closest(".dropdown");
    const bsHeaderAccountMenu = new bootstrap.Dropdown(
      headerAccountMenu.querySelector(".btn")
    );
    const bsMobileMainMenu = new bootstrap.Modal(menuMainMobile);
    const bsMobileAccountMenu = new bootstrap.Modal(menuAccountMobile);
    const mediaQueryList = window.matchMedia("(max-width: 992px)");

    mediaQueryList.addEventListener("change", (e) => {
      // if less than 992px, hide the desktop dropdown menu
      if (e.matches) {
        bsHeaderAccountMenu.hide();
      }
      // if more than 992px, hide the mobile menus
      else {
        bsMobileMainMenu.hide();
        bsMobileAccountMenu.hide();
      }
    });
  }
});
