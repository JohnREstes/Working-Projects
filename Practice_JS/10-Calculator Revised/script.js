class Calculator {
    constructor(previousOperandText, currentOperandText){
        this.previousOperandText = previousOperandText
        this.currentOperandText = currentOperandText
        this.clear()
    }
    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    appendNumber(number){
        if (number === "." && this.currentOperand.includes('.')) return;
        if (number === "+/-") this.currentOperand = this.currentOperand.toString() * -1;
        else this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    chooseOperation(operation){
        if (this.currentOperand === '') return;
        if (this.previousOperand !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }
    compute(){
        let computation;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(previous) || isNaN(current)) return;
        switch (this.operation){
            case '+':
                computation = previous + current;
                break;  
            case '-':
                computation = previous - current;
                break; 
            case 'x':
                computation = previous * current;
                break; 
            case '÷':
                computation = previous / current;
                break; 
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }
    getDisplayNumber(number){
        const stringNumb = number.toString();
        const integerDigits = parseFloat(stringNumb.split('.')[0]);
        let decimalDigits = stringNumb.split('.')[1];
        if (!isNaN(decimalDigits)){
            decimalDigits = decimalDigits.slice(0, 6);
        }
        let intergerDisplay
        if(isNaN(integerDigits)){
            intergerDisplay = ''
        } else {
            intergerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0 });
        }
        if(decimalDigits != null){
            return `${intergerDisplay}.${decimalDigits}`
        } else {
            return intergerDisplay
        }
    }
    updateDisplay(){
        this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand);
        if(this.operation != null){
            this.previousOperandText.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandText.innerText = '';
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-deletes]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandText = document.querySelector('[data-previous-operand-text]');
const currentOperandText = document.querySelector('[data-current-operand-text]');

const calculator = new Calculator(previousOperandText, currentOperandText)

numberButtons.forEach(button => {
    button.addEventListener('click', ()=> {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', ()=> {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})