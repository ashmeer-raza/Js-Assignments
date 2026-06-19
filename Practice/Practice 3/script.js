1;
let a = prompt("Enter Number");

function evenOdd() {
  if (a % 2 === 0) {
    console.log("Even");
  } else {
    console.log("odd");
  }
}

evenOdd();

2;
let person = prompt("Enter name");
let age = prompt("Enter Age");

function str() {
  console.log(`Hello, ${person}! You are ${age} years old.`);
  return str;
}

str();

3;
function area(height, width) {
  let rectAngle = height * width;
  console.log("The are of RectAngle are ", rectAngle);
  return rectAngle;
}

let userHeight = Number(prompt("Enter Height "));
let userWidth = Number(prompt("Enter Width "));

area(userHeight, userWidth);

4;
function outer() {
  let count = 0;
  return function inner() {
    count++;
    return count;
  };
  inner();
}

let check = outer();
console.log(check());
console.log(check());

5;
let arr = [20, 5, 2, 22, 56, 8];
let max = arr[0];

function findLarge() {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  console.log(max);
}

findLarge();

6;
let product = [
  {
    name: "Mobile",
    price: 2000,
    category: "Electronics",
  },
  {
    name: "Laptop",
    price: 8000,
    category: "Electronics",
  },
  {
    name: "PC",
    price: 5000,
    category: "Electronics",
  },
];

product.forEach(function (e) {
  console.log(e.name);
});

let newArr = product.map(function (e) {
  return e.name;
});
console.log(newArr);

let newCat = product.filter(function (e) {
  return e.price > 3000;
});
console.log(newCat);

let total = product.reduce(function (total, item) {
  return total + item.price;
}, 0);
console.log(total);
