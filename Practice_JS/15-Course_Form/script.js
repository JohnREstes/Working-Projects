const cutomer = document.querySelector('.customer');
const course = document.querySelector('.course');
const author = document.querySelector('.author');
const submit = document.querySelector('.submitBtn');
const url = 'https://api.unsplash.com/photos/random?query=person&orientation=landscape&client_id=RazJYuaxnGXQlXDYzgF3rKLAt6d0Xz8XeQ3JC6vive8';

function newImage(){
    fetch(url)
    .then((response) => response.json())
    .then((json) => console.log(json.urls.small))
    .catch((error) => console.log(error));
}