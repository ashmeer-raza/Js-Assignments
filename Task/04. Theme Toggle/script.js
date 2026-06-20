const darkBtn = document.querySelector(".dark-theme");
const lightBtn = document.querySelector(".light-theme");
const main = document.querySelector("main");

themeApply = function (themes) {
  main.classList.remove("darked", "light");
  main.classList.add(themes === "darked" ? "darked" : "light");
  main.dataset.theme = themes;

  darkBtn.setAttribute("aria-pressed", themes === "darked");
  darkBtn.setAttribute("aria-pressed", themes === "light");
};

lightBtn.addEventListener("click", () => {
  themeApply("light");
});

darkBtn.addEventListener("click", () => {
  themeApply("darked");
});
