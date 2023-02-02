const budgetDollar = document.querySelector('[data-budget-dollar]');
const calcButton = document.querySelector('[data-calc]');
const expenseType = document.querySelector('[data-expense-type]');
const expenseDollar = document.querySelector('[data-expense-dollar]');
const expButton = document.querySelector('[data-add]');
const budgetDollarTotal = document.querySelector('[data-budget-dollar-total]');
const runningTotal = document.querySelector('[data-running-total]');

var budget = 0, expense = 0, balance = 0;

calcButton.onclick = ()=>{
    budgetDollarTotal.textContent = formatUSD(budgetDollar.value);
    budgetDollar.value = ''
};
expButton.onclick = ()=>{
    expenseType.value === '' ? expenseType.classList.add('missing') : expenseType.classList.remove('missing');
    expenseDollar.value === '' ? expenseDollar.classList.add('missing') : expenseDollar.classList.remove('missing');
    if(expenseType.value === '' || expenseDollar.value === "") return;
    let type = expenseType.value;
    let dollar = expenseDollar.value;
    buildEntry(type, dollar);
}

function formatUSD(amount){
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' } ).format(parseFloat(amount));
}

function buildEntry(type, dollar){

}