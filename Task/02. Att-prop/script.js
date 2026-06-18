const div = document.querySelector("#card");
const inp = document.querySelector("input");

//Attributes
console.log("...............Attributes...............");
//getAttributes()
console.log("getAttributes: ", div.getAttribute("id"));
console.log("getAttributes: ", div.getAttribute("data-status"));

//setAttributes()
const change = div.setAttribute("id", "card1");
console.log("getAttributes: ", div.getAttribute("id"));

//removeAttributes()
div.removeAttribute("class");

//hasAttributes()
console.log(div.hasAttribute("class"));

//dataset()
console.log(".........custom Data Attributes............");
console.log(div.dataset.id);
console.log(div.dataset.status);
console.log(div.dataset.category);

//Attr vs Props
console.log("Props : ", inp.value); //initial val
console.log("Attr : ", inp.getAttribute("value")); //initial val

//After Val Update
inp.value = "Raza";
console.log("Props : ", inp.value); //val after updates (Raza)
console.log("Attr : ", inp.getAttribute("value")); // val after updates (Ashmeer ) , it still taking initial val instead of updated

// Attribute → HTML markup (HTML tree) mein jo value likhi hui hai usse read karta hai.
// Property → DOM object ki current/live value ko read karta hai.

// Attribute = HTML source/original value
// Property  = DOM current/live value
