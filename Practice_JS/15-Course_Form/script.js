const cutomer = document.querySelector('.customer');
const course = document.querySelector('.course');
const author = document.querySelector('.author');
const submit = document.querySelector('.submitBtn');
const coursePhoto = document.querySelectorAll('.coursePhoto')
const template = document.querySelector('.newCourse');
const url = 'https://api.unsplash.com/photos/random?query=person&orientation=landscape&client_id=RazJYuaxnGXQlXDYzgF3rKLAt6d0Xz8XeQ3JC6vive8';
let photoUrl = './IMG/donut1.jpg';

async function fetchImage(photo) {
    let response = await fetch(url);
    if (response.status === 403) {
        let data = await response.text();
        console.log(data);
    } else {
        let data = await response.json();
        console.log(data.urls.small);
        return data.urls.small;
    }
}
//coursePhoto.forEach(photo =>{
//    fetchImage(photo);
//})
function buildCourse(){


    let newCourse = `
    <div class="courseItem">
    <div class="image">
        <img class="coursePhoto" src="${fetchImage()}" alt="" srcset="">
    </div>
    <div class="text">
        <p class="customerText">${cutomer}</p>
        <p class="courseText">${course}</p>
        <p class="authorText">${author}</p>
    </div>
    </div>`
}