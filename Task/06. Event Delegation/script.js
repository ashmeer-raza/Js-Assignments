const btns = document.querySelectorAll("button");

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    console.log("Thanks for Clicking " + btn.textContent);
  });
});
