const customer = document.querySelector('.customer');
const course = document.querySelector('.course');
const author = document.querySelector('.author');
const submit = document.querySelector('.submitBtn');
const grid = document.querySelector('.grid');
const coursePhoto = document.querySelectorAll('.coursePhoto')
const template = document.querySelector('.newCourse');
const url = 'https://api.unsplash.com/photos/random?query=person&orientation=landscape&client_id=RazJYuaxnGXQlXDYzgF3rKLAt6d0Xz8XeQ3JC6vive8';


submit.addEventListener('click', ()=>{
    if(customer.value === '' || course.value === '' || author.value === ''){
        errorCheck();
        return;
    }
    buildCourse();
    clearInputs();
})

async function fetchImage(id) {
    let response = await fetch(url);
    console.log(response.status);
    if (response.status !== 200) {
        let data = await response.text();
        console.log(data);
        document.getElementById(id).src = "./IMG/donut1.jpg";
    } else {
        let data = await response.json();
        document.getElementById(id).src = data.urls.small;
    }
}

function buildCourse(){
    let newID = self.crypto.randomUUID();
    let cartDiv = document.createElement('div');
    cartDiv.className = 'courseItem';
    let newCourse = `
    <div class="image">
        <img class="coursePhoto" id="${newID}" src="" alt="Person" srcset="">
    </div>
    <div class="text">
        <p class="customerText"><span class="span spanName">Name : </span>  ${customer.value}</p>
        <p class="courseText"><span class="span spanCourse">Course : </span>  ${course.value}</p>
        <p class="authorText"><span class="span spanAuthor">Author : </span>  ${author.value}</p>
    </div>
    `;
    grid.appendChild(cartDiv);
    grid.lastChild.innerHTML = newCourse;
    fetchImage(newID);
}
function clearInputs(){
    customer.value = '';
    course.value = '';
    author.value = '';
    customer.classList.remove("error");
    course.classList.remove("error");
    author.classList.remove("error");
}
function errorCheck(){
    if(customer.value === ''){
        customer.classList.add("error");
    }
    if (course.value === ''){
        course.classList.add("error");
    } 
    if (author.value === ''){
        author.classList.add("error");
    } 
}