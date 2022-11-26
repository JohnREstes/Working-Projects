const body = document.querySelector('.container');
const nav = document.querySelector('.nav');
let previousScrollPos = window.pageYOffset

var offset = body.offsetHeight - nav.offsetHeight;
console.log(body.offsetHeight);
console.log(nav.offsetHeight);
console.log(window.scrollY);

window.onscroll = ()=>{
    console.log(window.scrollY);
    if(window.scrollY> offset){
        nav.classList.remove('nav-bottom');
        nav.classList.add('nav-top');
    } else {
        nav.classList.remove('nav-top');
        nav.classList.add('nav-bottom');
    }
}