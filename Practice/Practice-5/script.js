//Find Expensive Products
let prices = [100, 250, 500, 150, 700];

let newPrice = prices.filter((e) => e > 300);
// let newPrice = prices.filter((price) => price > 300);  // both are same , This is clarified version of the above code. where 'price' is the parameter name which is more meaningful than 'e'.
console.log(newPrice);

//Student Average
let marks = [80, 90, 70, 85, 95];
let total = marks.reduce((acc, currentVal) => {
  return acc + currentVal;
}, 0);
console.log(total / marks.length);

//Print User Information usinf methods
let user = {
  name: "Ashmeer",
  age: 20,
  city: "Nashik",
};

for (let [key, val] of Object.entries(user)) {
  console.log(key, val);
}

//Highest Paid Employee
let employees = {
  aman: 25000,
  ritik: 50000,
  priya: 45000,
};

let highestSalary = 0;
highestPaidEmployee = "";

for (let name in employees) {
  // employee name whose salary greater
  if (employees[name] > highestSalary) {
    highestSalary = employees[name]; //Update the highest salary
    highestPaidEmployee = name; //Update the employees name
  }
}

console.log(highestPaidEmployee);

//Discount Calculator
function calculateDiscount(price) {
  let discount = price * 0.1;
  let finalPrice = price - discount;
  console.log(finalPrice);
}

calculateDiscount(100);

//Find Adult Users
let users = [
  { name: "Ritik", age: 20 },
  { name: "Aman", age: 16 },
  { name: "Priya", age: 25 },
];

function getAdults(users) {
  return users.filter((user) => user.age >= 18);
}
console.log(getAdults(users));

//Shopping Cart Total
let cart = [
  { name: "Mouse", price: 500, qty: 2 },
  { name: "Keyboard", price: 1000, qty: 1 },
  { name: "Monitor", price: 10000, qty: 1 },
];

function getCartTotal(cart) {
  return cart.reduce((acc, val) => {
    return acc + val.price * val.qty;
  }, 0);
}

console.log(getCartTotal(cart));
