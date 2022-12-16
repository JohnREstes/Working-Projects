const root = document.querySelector(':root')
const body = document.querySelector('body');
const container = document.querySelector('.container');
const first = document.querySelector('.first')
const navbar = document.getElementById("navbar");
const stickyNav = navbar.offsetTop;

const observer = new IntersectionObserver(entries => {
    console.log(entries);
    navbar.classList.toggle("sticky", !(entries[0].isIntersecting));
},{
    rootMargin: (stickyNav + "px")
});

observer.observe(first)