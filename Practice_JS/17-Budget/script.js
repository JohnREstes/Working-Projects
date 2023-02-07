class Expense {
  constructor(type, value) {
    this.type = type,
    this.value = value;
  }
  createEl() {
    let newID = self.crypto.randomUUID();
    let expTil = document.createElement("span");
    expTil.classList.add(`expenseTitle`, `${newID}`);
    expTil.textContent = this.type;
    let expVal = document.createElement("span");
    expVal.classList.add(`expenseValue`, `${newID}`);
    expVal.textContent = this.value;
    expVal.id = `item${newID}`;
    let divEdDel = document.createElement("div");
    divEdDel.classList.add(`editDelete`, `${newID}`);
    divEdDel.innerHTML = `
            <i class="fa-solid fa-pen-to-square ${newID}" id="edit${newID}"></i>
            <i class="fa-solid fa-trash ${newID}" id="delete${newID}"></i>       
        `
    runningTotal.appendChild(expTil);
    runningTotal.appendChild(expVal);
    runningTotal.appendChild(divEdDel);
    this.addClick(`edit${newID}`, newID);
    this.addClick(`delete${newID}`, newID);
    expenseDollarTotal.textContent = formatUSD(
      parseFloat(expenseDollarTotal.textContent.replace(/[^0-9\.-]+/g, "")) +
      parseFloat((document.getElementById(`item${newID}`).textContent).replace(/[^0-9\.-]+/g, ""))
    );
  }
  addClick(id, uuid){
    document.getElementById(id).addEventListener('click', ()=>{
      if(!id.search('edit')){
        alert('edit');
      }else{
        let elements = document.getElementsByClassName(uuid);
        for(let i = 0; i < elements.length; i++){
          elements[0].remove();
          expenseDollarTotal.textContent = formatUSD(
            parseFloat(expenseDollarTotal.textContent.replace(/[^0-9\.-]+/g, "")) -
            parseFloat((document.getElementById(`item${uuid}`).textContent).replace(/[^0-9\.-]+/g, ""))
          );
          calcBalance();
        }
      }
    })
  }
}

const budgetDollar = document.querySelector("[data-budget-dollar]");
const calcButton = document.querySelector("[data-calc]");
const expenseType = document.querySelector("[data-expense-type]");
const expenseDollar = document.querySelector("[data-expense-dollar]");
const expButton = document.querySelector("[data-add]");
const budgetDollarTotal = document.querySelector("[data-budget-dollar-total]");
const expenseDollarTotal = document.querySelector("[data-expense-dollar-total]");
const balanceDollarTotal = document.querySelector("[data-balance-dollar-total]");
const runningTotal = document.querySelector("[data-running-total]");

budgetDollarTotal.textContent = formatUSD(0);
expenseDollarTotal.textContent = formatUSD(0);
balanceDollarTotal.textContent = formatUSD(0);

calcButton.onclick = () => {
  budgetDollarTotal.textContent = formatUSD(budgetDollar.value);
  budgetDollar.value = "";
  calcBalance();
};
expButton.onclick = () => {
  expenseType.value === ""
    ? expenseType.classList.add("missing")
    : expenseType.classList.remove("missing");
  expenseDollar.value === ""
    ? expenseDollar.classList.add("missing")
    : expenseDollar.classList.remove("missing");
  if (expenseType.value === "" || expenseDollar.value === "") return;
  expenseDollarTotal.textContent = formatUSD(expenseDollar.value);
  calcBalance();
  let type = expenseType.value;
  let dollar = formatUSD(expenseDollar.value);
  new Expense(type, dollar).createEl();
  expenseDollar.value = "";
  expenseType.value = "";
};

function formatUSD(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(parseFloat(amount));
}
function calcBalance() {
  balanceDollarTotal.classList.remove("green"); 
  balanceDollarTotal.classList.remove("red");  
  balanceDollarTotal.textContent = formatUSD(
    parseFloat(budgetDollarTotal.textContent.replace(/[^0-9\.-]+/g, "")) -
    parseFloat(expenseDollarTotal.textContent.replace(/[^0-9\.-]+/g, ""))
  );
  (parseFloat(balanceDollarTotal.textContent.replace(/[^0-9\.-]+/g, "")) >= 0)
    ? balanceDollarTotal.classList.add("green") 
    : balanceDollarTotal.classList.add("red");
}
function you(you) {
  console.log(you);
}
