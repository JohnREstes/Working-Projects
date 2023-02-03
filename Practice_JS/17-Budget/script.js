const budgetDollar = document.querySelector('[data-budget-dollar]');
const calcButton = document.querySelector('[data-calc]');
const expenseType = document.querySelector('[data-expense-type]');
const expenseDollar = document.querySelector('[data-expense-dollar]');
const expButton = document.querySelector('[data-add]');
const budgetDollarTotal = document.querySelector('[data-budget-dollar-total]');
const expenseDollarTotal = document.querySelector('[data-expense-dollar-total]');
const balanceDollarTotal = document.querySelector('[data-balance-dollar-total]');
const runningTotal = document.querySelector('[data-running-total]');

budgetDollarTotal.textContent = formatUSD(0);
expenseDollarTotal.textContent = formatUSD(0);
balanceDollarTotal.textContent = formatUSD(0);

calcButton.onclick = ()=>{
    budgetDollarTotal.textContent = formatUSD(budgetDollar.value);
    budgetDollar.value = '';
    balanceDollarTotal.textContent = formatUSD((parseFloat((budgetDollarTotal.textContent).replace(/[^0-9\.-]+/g,""))) - (parseFloat((expenseDollarTotal.textContent).replace(/[^0-9\.-]+/g,""))));
};
expButton.onclick = ()=>{
    expenseType.value === '' ? expenseType.classList.add('missing') : expenseType.classList.remove('missing');
    expenseDollar.value === '' ? expenseDollar.classList.add('missing') : expenseDollar.classList.remove('missing');
    if(expenseType.value === '' || expenseDollar.value === "") return;
    expenseDollarTotal.textContent = formatUSD(expenseDollar.value);
    expenseDollar.value = '';  
    balanceDollarTotal.textContent = formatUSD((parseFloat((budgetDollarTotal.textContent).replace(/[^0-9\.-]+/g,""))) - (parseFloat((expenseDollarTotal.textContent).replace(/[^0-9\.-]+/g,""))));
    let type = expenseType.value;
    let dollar = expenseDollar.value;
    //buildEntry(type, dollar);
}

function formatUSD(amount){
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' } ).format(parseFloat(amount));
}


function buildEntry(type, dollar){
    let newLine = 14;
}