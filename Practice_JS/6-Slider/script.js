const next = document.querySelector('.next');
const previous = document.querySelector('.previous');
const slider = document.querySelector('.slider');
const backgroundIMGs = ['IMG_2630.jpg', 'IMG_2631.jpg','IMG_2632.jpg','IMG_2638.jpg','IMG_2639.jpg', 'IMG_2640.jpg']
var position = 0;

next.addEventListener('click', ()=>{
  imageSlide("nextSld");
});

previous.addEventListener('click', ()=>{
  imageSlide("previousSld");
});

function imageSlide(direction){
  if (direction == "nextSld" && position < 5){
    position += 1;
  } else if (direction == "nextSld" && position == 5){
    position = 0;
  } else if (direction == "previousSld" && position > 0){
    position -= 1
  } else {
    position = 5;
  }
  slider.style.backgroundImage = "url('" + backgroundIMGs[position] + "')";
}