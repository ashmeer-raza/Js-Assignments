const inpt = document.querySelector("#input");
const add = document.querySelector("#add");
const form = document.querySelector("form");
const ul = document.querySelector("ul");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let input = inpt.value.trim();
  if (input === "") {
    alert("Write Something");
    return;
  }

  let li = document.createElement("li");
  li.innerHTML = `<h1>${input}</h1>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
            <button class="complete">Complete</button>`;

  ul.append(li);
  inpt.value = "";
});

ul.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit")) {
    const h1 = e.target.parentElement.querySelector("h1");
    const newText = prompt("Edit task:", h1.textContent);
    if (newText) {
      h1.textContent = newText;
    }
  }

  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }

  if (e.target.classList.contains("complete")) {
    e.target.parentElement.style.textDecoration = "line-through";
    
  }
});
