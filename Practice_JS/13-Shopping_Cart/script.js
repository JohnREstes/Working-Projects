const root = document.querySelector(':root')
const buttons = document.querySelectorAll('.btn');
const items = document.querySelectorAll('.item');
const itemName = document.querySelectorAll('.itemName');
const searchBar = document.querySelector('.searchBar');
const modal = document.querySelector("#myModal");
const closeX = document.querySelectorAll(".close");
const itemBkgrd = document.querySelectorAll(".itemBkgrd");
const modalImg = document.querySelector('.modalImg');
const arrows = document.querySelectorAll('.arrow');
const headerCart = document.querySelector('.headerCart')
const cartModal = document.querySelector('.cartModal');
const cartModalContent = document.querySelector('.cart-modal-content');
const cartList = document.querySelector('.cartList');
const cartTotal = document.querySelector('#cartTotal');
let backgroundImg, index, cartCount = 0, cartSum = 0, modalArry = [], shoppingCart = [];

processSort('');

headerCart.onclick = (e)=>{
    cartModal.style.display = "block";
    cartModalContent.classList.add("slide");
}

buttons.forEach(button => {
    button.onclick = (e) => {
        btnClick(e.target.classList[1]);
    }
})
function trashCan(){
    let trash = document.querySelectorAll(".trash");
    trash[(trash.length - 1)].onclick = (e) => {
        e.target.parentElement.parentElement.remove();
        cartCount -= 1
        root.style.setProperty('--cart-content', '"' + cartCount + '"');
        cartSum = cartSum - digitsOnly(e.target.previousSibling.data);
        cartTotal.innerHTML = `$${cartSum.toFixed(2)}`;
    }
}

items.forEach(item => {
    item.onclick = (e) => {
        if(e.target.classList.value === "cart") addCart(e);
        else {
            modal.style.display = "block";
            backgroundImg = e.target.style.backgroundImage;
            modalImg.style.backgroundImage = backgroundImg;
            index = modalArry.indexOf(backgroundImg);
        }
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
        let itemName = i.children[2].children[0].innerHTML.toLowerCase();
        if (itemName.indexOf(value) == -1) { 
            i.classList.add("hidden");
        }
        else { 
            i.classList.remove("hidden"); 
            modalArry.push(i.children[0].style.backgroundImage);
        }  
    }
}
closeX.forEach(close => {
    close.onclick = () => {
        modal.style.display = "none";
        cartModal.style.display = "none";
        cartModalContent.classList.remove("slide");
    }
})

window.onclick = (e) => {
    if (e.target == modal) {modal.style.display = "none";}
    if (e.target == cartModal) {
        cartModal.style.display = "none";
        cartModalContent.classList.remove("slide");
    }
}
function addCart(item){
    cartCount += 1
    root.style.setProperty('--cart-content', '"'+cartCount+'"');
    let number = digitsOnly(item.srcElement.nextElementSibling.children[1].innerHTML);
    shoppingCart.push(Number(number));
    let nextItem = item.srcElement.nextElementSibling.children;
    build(nextItem);
}
function build(item){
    let cartLi = document.createElement("li");
    cartLi.className = 'cartItem';
    var innerCartString = `            
            <span class="cartItemName">${item[0].innerHTML}</span>
            <span class="cartItemCost">${item[1].innerHTML}
            <img src="./IMG/trash.png" alt="Delete Item" class="trash">
            </span>
    `
    cartList.appendChild(cartLi);
    cartList.lastChild.innerHTML = innerCartString;
    cartSum = shoppingCart.reduce((total, number)=>{
        return total + number;
    },0);
    cartTotal.innerHTML = `$${cartSum.toFixed(2)}`;
    trashCan();
    return 
}
function digitsOnly(value){
    return value.replace( /^\D+/g, '');   
}