const person = {
    name: "Obaseki Nosa",
    location: "Lagos",
}

window.localStorage.setItem('user', JSON.stringify(person));
JSON.parse(window.localStorage.getItem('user'));

window.localStorage.removeItem('name');
window.localStorage.clear();