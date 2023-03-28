const MONTHS = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS_IN_MONTHS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const header = document.querySelector('[data-month]');
const calYear = document.querySelector('[data-year]');
const square = document.querySelectorAll('[data-calendar]');
const arrow = document.querySelectorAll('[data-arrow]');
let currentDate, month, year;

fillMonth();

function fillMonth(today = new Date()){
    currentDate = today;
    let date = 1;
    let firstDay = false;
    month = today.getMonth();
    year = today.getFullYear()
    console.log(year, 'fill month');
    let firstOfMonth = new Date(year, month, 1, 12, 00, 00, 0);
    let day = firstOfMonth.getDay();
    let numberOfDays = getDays(year, month);
    header.innerText = MONTHS[month];
    calYear.innerText = year;
    square.forEach((days, index) =>{
        days.dataset.calendar = '';
        if(index === day) firstDay = true;
        if(firstDay && date <= numberOfDays){
            days.dataset.calendar = date;
            date++;
        }
    })
}
arrow.forEach(direction =>{
    direction.addEventListener('click', ()=>{
        console.log(direction.dataset.arrow);
        if(direction.dataset.arrow == 'right'){
            fillMonth(addMonths(currentDate, 1));
        } else {
            fillMonth(subtractMonths(currentDate, 1));
        }
    })
})
function getDays(currentYear, currentMonth){
    //Feb year check div by 4 and div by 400 but not 100
    if(currentMonth === 1){
        if(currentYear % 100 === 0 && currentYear % 400 !== 0) {
            return 28;}
        else if(currentYear % 4 !== 0) {
            return 28;}
        else {
            return 29;}
    }
    return DAYS_IN_MONTHS[currentMonth];
}
function subtractMonths(date, months) {
    date.setMonth(date.getMonth() - months);
    return date;
}
function addMonths(date, months) {
    date.setMonth(date.getMonth() + months);
    return date;
}