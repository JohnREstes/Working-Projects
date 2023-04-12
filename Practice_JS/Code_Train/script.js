
const root = document.documentElement;
const container = document.getElementsByClassName('container');
const backgroundColor = ['--rgb1', '--rgb2', '--rgb3'];

container[0].addEventListener("click", ()=>{
  backgroundColor.forEach(item =>{
    randomColorRBG(item);
  });
  randomShape();
 });

function randomColorRBG(rgb){
    var colorValue = (randomNum(255) + 1);
    root.style.setProperty(rgb, colorValue);
}

function randomShape(){
  let tempDiv = document.createElement('div');
  (Math.random() >= .5) ? tempDiv.classList.add('circle') : tempDiv.classList.add('square');
  let id = self.crypto.randomUUID();
  tempDiv.id = id;
  tempDiv.style.backgroundColor = `rgb(${randomNum(255)+1}, ${randomNum(255)+1}, ${randomNum(255)+1})`
  tempDiv.style.top = `${randomNum(100)+1}%`;
  tempDiv.style.left = `${randomNum(100)+1}%`;
  let widthHeight = (randomNum(150) + 50)
  tempDiv.style.width = `${widthHeight}px`;
  if(tempDiv.classList[0] == 'square'){
    tempDiv.style.rotate = `${randomNum(90) + 1}deg`;
  }
  container[0].appendChild(tempDiv);
}
function randomNum(num){
  return Math.floor(Math.random() * num)
}