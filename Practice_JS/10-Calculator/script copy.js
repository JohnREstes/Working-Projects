const grid = document.querySelectorAll('.grid');
var countDigit = 0, countOperator = ""; 
var digit1 = null, digit2 = null, digit3 = null, operator1 = null, operator2 = null;
const decimal = /[0-9]+\./;
var float = false;
var currentDigit;

grid.forEach(item => {
    item.onclick = (btn) => {
        let button = btn.target.dataset.btn;
        process(button)
    }
})
function process(button){
    if (!isNaN(button)) {
        if (operator1 === null) digitPress(button, "digit1");
        else if (operator2 === null) digitPress(button, "digit2");
        else digitPress(button, "digit3");
    } else {
        operatorPress(button);
        console.log('other');
    } 
    float ? grid[0].innerHTML = parseFloat(currentDigit) + "." : grid[0].innerHTML = parseFloat(currentDigit);
    float = false;
}
function operatorPress(button){
    if (button === "decimal"){
            if (currentDigit.match(decimal)) return;
            currentDigit = currentDigit + ".";
            float = true;
    }

}
function digitPress(button, digit){
    if (operator1 === null){
        if(currentDigit === null) currentDigit = 0
        currentDigit += button;
        console.log(parseFloat(currentDigit));
    } else if (operator1 === !null && operator2 === null){  
        digit2 = currentDigit;
    } 
}