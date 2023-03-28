const MONTHS = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS_IN_MONTHS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const header = document.querySelector('[data-month]');
const square = document.querySelectorAll('[data-calendar]');
const arrow = document.querySelectorAll('[data-arrow]');

fillMonth();

function fillMonth(){
    let date = 1;
    let firstDay = false;
    let today = new Date();
    let month = today.getMonth();
    let firstOfMonth = new Date(today.getFullYear(), month, 1, 12, 00, 00, 0);
    let day = firstOfMonth.getDay();
    header.innerText = MONTHS[month];
    square.forEach((days, index) =>{
        days.dataset.calendar = '';
        if(index === day) firstDay = true;
        if(firstDay && date <= DAYS_IN_MONTHS[month]){
            days.dataset.calendar = date;
            date++;
        }
    })
}

arrow.forEach(direction =>{
    direction.addEventListener('click', ()=>{
        console.log(direction.dataset.arrow);
    })
})