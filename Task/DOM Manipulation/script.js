const input = document.querySelector("#taskInput");
const bottomBtn = document.querySelector("#appendBtn");
const topBtn = document.querySelector("#prependBtn");
const myList = document.querySelector("#myList");

function creates(data) {
  let li = document.createElement("li");
  li.textContent = data;

  let editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("editBtn");

  let completeBtn = document.createElement("button");
  completeBtn.textContent = "Complete";
  completeBtn.classList.add("completeBtn");

  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("deleteBtn");
    


  li.append(editBtn);
  li.append(completeBtn);
  li.append(deleteBtn);

  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

  completeBtn.addEventListener("click", () => {
    li.classList.toggle("done");
  });

  return li;
}

bottomBtn.addEventListener("click", () => {
  let data = input.value;
  if (data.trim() === "") {
    alert("Please write Something");
    return;
  }
  let li = creates(data);
  myList.append(li);
  input.value = "";
});

topBtn.addEventListener("click", () => {
  let data = input.value;
  if (data.trim() === "") {
    alert("Please write Something");
    return;
  }
  let li = creates(data);
  myList.prepend(li);
  input.value = "";
});
