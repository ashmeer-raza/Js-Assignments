const grandParent = document.querySelector(".g-parent");
const parent = document.querySelector(".parent");
const button = document.querySelector("button");

//Bubbling Bottom → Up
grandParent.addEventListener("click", () => {
  console.log("Grand Parent - bub");
});

parent.addEventListener("click", () => {
  console.log("Parent - bub");
  e.stopPropagation();
});

button.addEventListener("click", () => {
  console.log("button - bub");
});

//Capturing Top → Down

grandParent.addEventListener(
  "click",
  (e) => {
    console.log("Grand Parent - cap");
    e.stopPropagation(); // Used for Stop Traversal
  },
  true,
);

parent.addEventListener(
  "click",
  () => {
    console.log("Parent - cap ");
  },
  true,
);

button.addEventListener(
  "click",
  () => {
    console.log("button - cap");
  },
  true,
);

/* Capturing phase – event travels from window down to the target element.
Target phase – event reaches the clicked element.
Bubbling phase – event travels back up from the target to its ancestors. */
