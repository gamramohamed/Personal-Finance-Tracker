let Income = document.getElementById("Income");
let categorySlct = document.getElementById("categorySlct");
let amountInp = document.getElementById("amount");
let dateSlct = document.getElementById("date");
let addBtn = document.getElementById("addBtn");
let deleteAllBtn = document.getElementById("deleteAll");
let tbody = document.getElementById("expenseTbody");
let mood = "add";
let imp;

function saveIncome() {
  localStorage.Income = Income.value;
}
// if (localStorage.length > 0) {
//   Income.value = localStorage.Income;
// }

// create data
let expense;
if (localStorage.Expense != null) {
  expense = JSON.parse(localStorage.Expense);
} else {
  expense = [];
}

function create() {
  let obj = {
    Category: categorySlct.value,
    Amount: amountInp.value,
    Date: dateSlct.value,
  };
  if (mood === "add") {
    expense.push(obj);
    localStorage.Expense = JSON.stringify(expense);
  } else {
    expense[imp] = obj;
    mood = "add";
    add()
  }
}



function add() {
  let newRow = "";
  for (let i = 1; i < expense.length; i++) {
    newRow += `
    <tr>
    <td>${i}</td>
    <td>${expense[i].Category}</td>
    <td>${expense[i].Amount}</td>
    <td>${expense[i].Date}</td>
    <td><button onclick="update(${i})">Update</button></td>
    <td><button onclick="deleteExpense(${i})">Delete</button></td>
   
    </tr>`;
  }
  tbody.innerHTML = newRow;
  if (expense.length > 2) {
    deleteAllBtn.innerHTML = `<button onclick="deleteAll()">Delete All</button>`;
  } else {
    deleteAllBtn.innerHTML = "";
  }
}
add();

// update data
function update(i) {
  categorySlct.value = expense[i].Category;
  amountInp.value = expense[i].Amount;
  dateSlct.value = expense[i].Date;
  mood = "update";
  addBtn.innerHTML = "Update";
  imp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// delete All data
function deleteAll() {
  localStorage.clear();
  expense.splice(0);
  add();
}

// delete data
function deleteExpense(i) {
  expense.splice(i, 1);
  localStorage.Expense = JSON.stringify(expense);
  add();
}
