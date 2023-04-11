
const root = document.documentElement;
const container = document.getElementsByClassName('container');
const backgroundColor = ['--rgb1', '--rgb2', '--rgb3'];

container[0].addEventListener("click", ()=>{
  backgroundColor.forEach(randomColorRBG);
  randomShape();
 });

function randomColorRBG(rgb){
    var colorValue = Math.floor(Math.random() * (255 + 1));
    root.style.setProperty(rgb, colorValue);
}
let randomColor = function(){
  return Math.floor(Math.random() * (255 + 1));
}

function randomShape(){
  let tempDiv = document.createElement('div');
  (Math.random() >= .5) ? tempDiv.classList.add('circle') : tempDiv.classList.add('square');
  let id = self.crypto.randomUUID();
  tempDiv.id = id;
  tempDiv.style.top = `${randomNum(100)+1}%`;
  tempDiv.style.left = `${randomNum(100)+1}%`;
  container[0].appendChild(tempDiv);
}
function randomNum(num){
  return Math.floor(Math.random() * num)
}