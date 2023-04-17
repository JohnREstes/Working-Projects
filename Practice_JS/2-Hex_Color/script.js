const changeButton = document.querySelector('.changeButton');
const hexValue = document.querySelector('.hexValue');
const root = document.documentElement;
const options = '0123456789ABCDEF';

changeButton.addEventListener("click", ()=>{
  randomColorHEX();
 });

function randomColorHEX(){
    var colorValue = "#"
    for(let i = 0; i < 6; i++){
      colorValue += options[Math.floor(Math.random() * 16)];
    }
    root.style.setProperty('--HEX', colorValue);
    hexValue.innerHTML = ' ' + colorValue;
}