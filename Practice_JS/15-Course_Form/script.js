const cutomer = document.querySelector('.customer');
const course = document.querySelector('.course');
const author = document.querySelector('.author');
const submit = document.querySelector('.submitBtn');
const coursePhoto = document.querySelectorAll('.coursePhoto')
const url = 'https://api.unsplash.com/photos/random?query=person&orientation=landscape&client_id=RazJYuaxnGXQlXDYzgF3rKLAt6d0Xz8XeQ3JC6vive8';
let photoUrl = './IMG/donut1.jpg';

async function fetchImage() {
    let response = await fetch(url);
    if (response.status === 403) {
        let data = await response.text();
        console.log(data);
    } else {
        let data = await response.json();
        console.log(data.urls.small);
        photoUrl = data.urls.small
    }
}
function newImage(){
    fetch(url)
    .then((response) => response.json())
    .then((json) => console.log(json.urls.small), photoUrl = (json.urls.small) )
    .catch((error) => console.log(error));
}
coursePhoto.forEach(photo =>{
    fetchImage();
    photo.src = `${photoUrl}`;
})
