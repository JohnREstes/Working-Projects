const buttons = document.querySelectorAll('.btn');
const items = document.querySelectorAll('.item');
const searchBar = document.querySelector('.searchBar');
const modal = document.querySelector("#myModal");
const closeX = document.querySelector(".close");
const itemBkgrd = document.querySelectorAll(".itemBkgrd");
const modalImg = document.querySelector('.modalImg');
const arrows = document.querySelectorAll('.arrow');
let backgroundImg, index, modalArry = [];

processSort('');

buttons.forEach(button => {
    button.onclick = (e) => {
        btnClick(e.target.classList[1]);
    }
})
items.forEach(item => {
    item.onclick = (e) => {
        modal.style.display = "block";
        backgroundImg = e.target.style.backgroundImage;
        modalImg.style.backgroundImage = backgroundImg;
        index = modalArry.indexOf(backgroundImg);
    }
})
arrows.forEach(arrow => {
    arrow.onclick = (e) => {
        if (e.target.classList[1] === 'arrow-right'){
            index++;
            if (index === modalArry.length) index = 0;
            modalImg.style.backgroundImage = modalArry[index];
        } else {
            index--;
            if (index === -1) index = modalArry.length -1;
            modalImg.style.backgroundImage = modalArry[index];
        }
    }
})
function btnClick(target){
    searchBar.value = "";
    if (target === "all") processSort('');
    else processSort(target);
}

searchBar.onkeyup = () => {
    let search = searchBar.value.toLowerCase();
    processSort(search);
}
function processSort(value){
    modalArry = [];
    for (let i of items) {
        let item = i.classList[1].toLowerCase();
        if (item.indexOf(value) == -1) { 
            i.classList.add("hidden");
        }
        else { 
            i.classList.remove("hidden"); 
            modalArry.push(i.children[0].style.backgroundImage);
        }  
    }
}
closeX.onclick = () => {
    modal.style.display = "none";
}
window.onclick = (e) => {
    if (e.target == modal) {modal.style.display = "none";}
}