const body = document.querySelector('body');
const container = document.querySelector('.container');
const navbar = document.getElementById("navbar");
const sticky = navbar.offsetTop;

console.log(sticky);

/*container.onscroll = (e)=>{
    myFunction();
}

function myFunction() {
    console.log("run");
    console.log(window.pageYOffset);
  if (window.pageYOffset >= sticky) {
  navbar.classList.add("sticky")
  } else {
  navbar.classList.remove("sticky");
  }
}*/

container.addEventListener("scroll", ()=>{
    console.log(window.pageXOffset);
    console.log(window.pageYOffset);   
});