// const btn = document.querySelector("button");
// const textArea = document.querySelector("#text-area");
// const main = document.querySelector("#main");

// btn.addEventListener("click", (e) => {});
const root = document.querySelector(".root");

const rh1 = React.createElement("h1", {}, "Hey");
const vDOM = ReactDom.createRoot(root).render(rh1);
