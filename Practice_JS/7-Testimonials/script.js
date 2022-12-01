const container = document.querySelector('.container');
const clientPhoto = document.querySelector('.clientPhoto');
const clientQuote = document.querySelector('.clientQuote');
const clientName = document.querySelector('.clientName');
const clientList = [
  {name:"John", photo: "John.jpg", testimonials: "Lorem ipsum dolor sit amet consectetur adipisicing elit excepturi deleniti iste porro dolore."},
  {name:"Leddy", photo: "Leddy.jpg", testimonials: "Sapiente vel dolorem, hic dignissimos aliquid, quod animi esse commodi est nobis provident debitis cumque."},
  {name:"Judy", photo: "Judy.jpg", testimonials: "Facere voluptate, adipisci ea tempora voluptatum optio quos non, praesentium laboriosam voluptas."},
  {name:"Mike", photo: "Mike.jpg", testimonials: "Rem pariatur obcaecati asperiores qui aspernatur recusandae reiciendis ut aliquid excepturi."},
  {name:"Lora", photo: "Lora.jpg", testimonials: "Accusamus quia sapiente dignissimos sit quod et quidem dicta labore ea reprehenderit omnis cumque."},
  ]  
var position = 0;

loadClient();

container.addEventListener('click', (e)=>{
  if (e.target.classList.value.includes("previous")){
    imageSlide("previousSld");
  } else if (e.target.classList.value.includes("next")){
    imageSlide("nextSld");
  } else return;
});

function imageSlide(direction){
  if (direction == "nextSld" && position < clientList.length - 1){
    position += 1;
  } else if (direction == "nextSld" && position == clientList.length - 1){
    position = 0;
  } else if (direction == "previousSld" && position > 0){
    position -= 1
  } else {
    position = clientList.length - 1;
  }
  loadClient();
}
function loadClient(){
  clientPhoto.style.backgroundImage = "url('" + clientList[position].photo + "')";
  clientQuote.textContent = clientList[position].testimonials;
  clientName.textContent = clientList[position].name;
}