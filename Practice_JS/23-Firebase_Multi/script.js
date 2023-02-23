import { handleChange } from "./firebase.js";
import { playerState } from "./firebase.js";

const changeButton = document.querySelector(".changeButton");
const root = document.documentElement;
const backgroundColor = ["--rgb1", "--rgb2", "--rgb3"];
const modal = document.querySelector('.modal');
let color = [];

changeButton.addEventListener("click", () => {
  color = [];
  backgroundColor.forEach(randomColorRBG);
  handleChange(color);
});

function randomColorRBG(rgb) {
  var colorValue = Math.floor(Math.random() * (255 + 1));
  root.style.setProperty(rgb, colorValue);
  color.push(colorValue);
}
modal.addEventListener('click', ()=>{
  modal.classList.add('hidden');
})
