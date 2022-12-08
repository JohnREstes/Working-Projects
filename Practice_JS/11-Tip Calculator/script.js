const billAmt = document.querySelector(".billAmt");
const sharing = document.querySelector(".sharing");
const serviceRating = document.querySelector("#serviceRating");
const calculate = document.querySelector(".calculate");
const answer = document.querySelector(".answer");

calculate.onclick = (e) =>{
    errorCheck();
}
function errorCheck(){
    let error = [];  
    if (billAmt.value <= 0 ) error.push("Must Enter Bill Amount!");
    if (sharing.value <= 0) error.push("Must Enter Number of People!");
    if (serviceRating.value === "blank") error.push("Must Rate Service!");
    if (error.length >0) reportError(error);
    else calcTip();
}
function calcTip(){
    answer.innerHTML = "$" + ((billAmt.value / sharing.value * (1 + (serviceRating.value * .01))).toFixed(2));
}
function reportError(error){
    console.log(error);
    error.forEach(errorMsg => {
        addError(errorMsg)
        setTimeout(() => {
            clearError()
         }, 3000);
    });

}
function addError(msg){
    const node = document.createElement("p");
    const textnode = document.createTextNode(msg);
    node.appendChild(textnode);
    answer.appendChild(node)
}
function clearError(){
    console.log("i ran");
    answer.removeChild(answer.lastElementChild);
}