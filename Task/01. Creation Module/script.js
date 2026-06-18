const form = document.querySelector("form");
const title = document.querySelector("#taskInput");
const select = document.querySelector("#categorySelect");
const addBtn = document.querySelector("#addBtn");
const taskContainer = document.querySelector(".taskContainer");

form.addEventListener("submit", (eve) => {
  eve.preventDefault();

  if (title.value.trim() === "") {
    alert("Write Title");
    return;
  }

  const taskCard = document.createElement("div");
  taskCard.classList.add("card");

  const titleTxt = document.createElement("h1");
  const selectorTxt = document.createElement("p");

  const tlt = document.createTextNode(title.value);
  const slt = document.createTextNode(select.value);

  titleTxt.append(tlt);
  selectorTxt.append(slt);

  taskCard.append(titleTxt);
  taskCard.append(selectorTxt);

  taskContainer.append(taskCard);

  form.reset();
});
