const root = document.documentElement;
const secondDeg = '--secondDeg';
const minuteDeg = '--minuteDeg';
const hourDeg = '--hourDeg';
let milli = 0;
let second = 0;
let minute = 0;
let hour = 0;

function updateTime(){
  let newDate = new Date();
  milli = newDate.getMilliseconds();
  console.log(milli);
  second = newDate.getSeconds();
  minute = newDate.getMinutes();
  hour = newDate.getHours();
}

function setTime(){
  if(hour > 12) hour -= 12;
  root.style.setProperty(secondDeg, ((second + (milli / 1000)) * 6));
  root.style.setProperty(minuteDeg, ((minute + (second / 60)) * 6));  
  root.style.setProperty(hourDeg, ((hour + (minute / 60)) * 30));
  console.log(`${hour}:${minute}:${second}`);
}

updateTime();
setTime();

setInterval(()=>{
  setTime();
  updateTime()
}, 100);