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
    expTil.id = `title${newID}`;
    let expVal = document.createElement("span");
    expVal.classList.add(`expenseValue`, `${newID}`);
    expVal.textContent = this.value;
    expVal.id = `value${newID}`;
    let divEdDel = document.createElement("div");
    divEdDel.classList.add(`editDelete`, `${newID}`);
    divEdDel.innerHTML = `
            <i class="fa-solid fa-pen-to-square ${newID}" id="edit${newID}"></i>
            <i class="fa-solid fa-trash ${newID}" id="delete${newID}"></i>       
        `
    runningTotal.appendChild(expTil);
    runningTotal.appendChild(expVal);
    runningTotal.appendChild(divEdDel);
    this.addClick(newID, 'edit');
    this.addClick(newID, 'delete');
    calcExpense(newID);
    calcBalance();
  }
  addClick(uuid, type){
    document.getElementById(`${type}${uuid}`).addEventListener('click', ()=>{
      if(type === 'edit'){     
        editing = true;
        currentID = uuid;
        expenseType.value = document.getElementById(`title${uuid}`).textContent;
        expenseDollar.value = removeFormat(document.getElementById(`value${uuid}`).textContent);
        calcExpense(uuid, 'add');
        calcBalance();   
      }else{
        calcExpense(uuid, 'add');
        calcBalance();
        let elements = document.getElementsByClassName(uuid);
        for(let i = 0; i <= elements.length; i++){
          elements[0].remove();
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
let editing = false, currentID = '';

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
  if(!editing){
    let type = expenseType.value;
    let dollar = formatUSD(expenseDollar.value);
    new Expense(type, dollar).createEl();
  } else {
    document.getElementById(`title${currentID}`).textContent = expenseType.value;
    document.getElementById(`value${currentID}`).textContent = formatUSD(expenseDollar.value);   
    calcExpense(currentID);
    calcBalance();
    currentID = '';
    editing = false; 
  }
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
      removeFormat(budgetDollarTotal.textContent) + 
      removeFormat(expenseDollarTotal.textContent));
  (removeFormat(balanceDollarTotal.textContent)  >= 0)
    ? balanceDollarTotal.classList.add("green") 
    : balanceDollarTotal.classList.add("red");
}
function removeFormat(num){
  return Number(num.replace(/[^0-9\.-]+/g,""));
}
function calcExpense(uuid, sign = ''){
  if(sign === 'add'){
    expenseDollarTotal.textContent = formatUSD(
      removeFormat(expenseDollarTotal.textContent) +
      removeFormat(document.getElementById(`value${uuid}`).textContent));
  } else {
  expenseDollarTotal.textContent = formatUSD(
    removeFormat(expenseDollarTotal.textContent) -
    removeFormat(document.getElementById(`value${uuid}`).textContent)
  );
}
}
