const output = document.querySelector('[data-output]');
const run = document.querySelector('[data-run]');
const clear = document.querySelector('[data-clear]');
let display = [];

const dishes = [
    {
        name: "Eggplant Parmesan",
        vegetarian: true
    },
    {
        name: "Spaghetti & Meatballs",
        vegetarian: false
    }, 
    {
        name: "Pomodoro",
        vegetarian: true
    },
    {
        name: "Veal Parm",
        vegetarian: false
    }     
]

function veg(){
    return dishes.filter(dish => dish.vegetarian === true);
}


run.onclick = ()=>{

    let vegDish = veg();
    vegDish.forEach(dish =>{
        display.push(dish.name);
    });
    addOutput();
}
clear.onclick = ()=>{
    output.innerHTML = ""
    display = [];
}
function addOutput(){
    for(item of display){
        let temp = document.createElement('li');
        temp.innerText = item;
        output.appendChild(temp);
    }
}