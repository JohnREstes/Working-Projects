import { pullWeather } from "./API_CALL.js";

const ICON_CODES = {
  0: "./img/day.svg", 
  1: "./img/cloudy-day-1.svg",
  2: "./img/cloudy-day-2.svg",
  3: "./img/cloudy-day-3.svg",
  45: "./img/fog.svg",
  48: "./img/fog.svg",  
  51: "./img/rainy-1.svg",
  53: "./img/rainy-3.svg",
  55: "./img/rainy-7.svg",
  56: "./img/snowy-1.svg",
  57: "./img/snowy-2.svg",
  61: "./img/rainy-1.svg",
  63: "./img/rainy-3.svg",
  65: "./img/rainy-7.svg", 
  66: "./img/snowy-1.svg",
  67: "./img/snowy-2.svg",  
  71: "./img/snowy-4.svg",
  73: "./img/snowy-5.svg",  
  75: "./img/snowy-6.svg",
  77: "./img/snowy-7.svg",
  80: "./img/rainy-1.svg",
  81: "./img/rainy-3.svg",
  82: "./img/rainy-7.svg", 
  85: "./img/snowy-1.svg",
  86: "./img/snowy-7.svg",
  95: "./img/thunder.svg",  
  96: "./img/thunder.svg",  
  99: "./img/thunder.svg" 
}
const ICON_CODES_NIGHT = {
  0: "./img/night.svg", 
  1: "./img/cloudy-night-1.svg",
  2: "./img/cloudy-night-2.svg",
  3: "./img/cloudy-night-3.svg",
  45: "./img/fog.svg",
  48: "./img/fog.svg",  
  51: "./img/rainy-4.svg",
  53: "./img/rainy-5.svg",
  55: "./img/rainy-7.svg",
  56: "./img/snowy-1.svg",
  57: "./img/snowy-2.svg",
  61: "./img/rainy-4.svg",
  63: "./img/rainy-5.svg",
  65: "./img/rainy-7.svg", 
  66: "./img/snowy-1.svg",
  67: "./img/snowy-2.svg",  
  71: "./img/snowy-4.svg",
  73: "./img/snowy-5.svg",  
  75: "./img/snowy-6.svg",
  77: "./img/snowy-7.svg",
  80: "./img/rainy-4.svg",
  81: "./img/rainy-5.svg",
  82: "./img/rainy-7.svg", 
  85: "./img/snowy-1.svg",
  86: "./img/snowy-7.svg",
  95: "./img/thunder.svg",  
  96: "./img/thunder.svg",  
  99: "./img/thunder.svg" 
}
const HOURS_SHOWN = 60;

const container = document.querySelector('.container');
const current = document.querySelectorAll(`[data-current]`);
const forecast = document.querySelectorAll(`[data-forecast]`);
const hourly = document.querySelector(`[data-hourly]`);
let json;

initApp();

async function initApp(){
  json = await pullWeather();
  if (json) {
    container.classList.remove('blurry');
    buildDay();
    buildForecast();
    buildHourly();
  }
}

function buildDay(){
  current.forEach(field =>{
    switch (field.dataset.current ) {
      case 'icon':
        let weatherCode = json.current_weather.weathercode;
        let weatherKey = findKey(weatherCode);
        field.style.backgroundImage = `url('${nightTime(new Date())[weatherKey]}')`;  
        break;
      case 'temp':
        field.innerHTML = `${json.current_weather.temperature} &#8451`;
        break;
      case 'wind':
        field.innerHTML = `${json.current_weather.windspeed} k/h`; 
        break;
      case 'fl-high':
        field.innerHTML = `${json.daily.apparent_temperature_max[0]} &#8451`;
        break;
      case 'fl-low':
        field.innerHTML = `${json.daily.apparent_temperature_min[0]} &#8451`;
        break;
      case 'high':
        field.innerHTML = `${json.daily.temperature_2m_max[0]} &#8451`;
        break;
      case 'low':
        field.innerHTML = `${json.daily.temperature_2m_min[0]} &#8451`;
        break;
      case 'precip':
        field.innerHTML = `${json.daily.precipitation_probability_max[0]}%`;
        break;
      case 'sunrise':
        field.innerHTML = `${timeFormat(new Date(json.daily.sunrise[0]))}`;
        break;
      case 'sunset':
        field.innerHTML = `${timeFormat(new Date(json.daily.sunset[0]))}`;
        break;
      default:
        break;
    }
  })
}
function buildForecast(){
  forecast.forEach((day, index) =>{
    let dailyForecast = day.children;
    for(let i = 0; i < dailyForecast.length; i++){
      switch (dailyForecast[i].dataset.forecastPart ) {
        case 'icon':
          let weatherCode = json.daily.weathercode[index];
          let weatherKey = findKey(weatherCode);
          dailyForecast[i].style.backgroundImage = `url('${nightTime(new Date())[weatherKey]}')`;  
          break;
        case 'temp':
          dailyForecast[i].innerHTML = `${json.daily.temperature_2m_max[index]} &#8451`;
          break;
        case 'day':
          let tempDay = new Date(`${json.daily.time[index]}, 12:00`).toLocaleString('en-US', { weekday: 'long',});
          dailyForecast[i].innerHTML = `${tempDay}`;
          break;
        default:
          break;
      };
    };
  });
}
function buildHourly(){
  let nowTime = new Date();
  let hoursShown = HOURS_SHOWN + nowTime.getHours();
  for(let i = nowTime.getHours(); i < hoursShown; i++){
    let tempDay = new Date(json.hourly.time[i]).toLocaleString('en-US', { weekday: 'long',});
    let tempTime = new Date(json.hourly.time[i]);
    tempTime = timeFormat(tempTime);
    let tempLI = document.createElement('li');
    tempLI.innerHTML = `
      <div class="hourlyBreakdown">
        <span class="currentType">${tempDay}<span class="currentNumber">${tempTime}</span></span>
        <div class="currentType" id="hourlyImg" ></div>
        <span class="currentType">Temp<span class="currentNumber">${json.hourly.temperature_2m[i]}&#8451</span></span>
        <span class="currentType">FL Temp<span class="currentNumber">${json.hourly.apparent_temperature[i]}&#8451</span></span>
        <span class="currentType">Wind<span class="currentNumber">${json.hourly.windspeed_10m[i]} k/h</span></span>
        <span class="currentType">Precip<span class="currentNumber">${json.hourly.precipitation[i]}mm</span></span>  
      </div>
    `;
    hourly.appendChild(tempLI);
    let weatherCode = json.hourly.weathercode[i];
    let weatherKey = findKey(weatherCode);
    hourly.children[(i - nowTime.getHours())].children[0].children[1].style.backgroundImage = `url('${nightTime(new Date(json.hourly.time[i]))[weatherKey]}')`
  }
}
function findKey(value){
  let object = nightTime();
  return Object.keys(object).find(key => key == value);
}
function nightTime(nowTime = (new Date())){
  let sunrise = new Date(json.daily.sunrise[1]);
  let sunset = new Date(json.daily.sunset[0]);
  if(sunrise.getHours() < nowTime.getHours() && sunset.getHours() > nowTime.getHours() ) return ICON_CODES;
  else return ICON_CODES_NIGHT;
}
function timeFormat(time){
  let timeHours = time.getHours();
  let timeMinutes = time.getMinutes();
  if(timeMinutes.toString().length === 1){
    timeMinutes = "0" + timeMinutes.toString();
  }
  if (timeHours == 0) time = `12:${timeMinutes} am`;
  else if (timeHours < 12) time = `${timeHours}:${timeMinutes} am`;
  else if (timeHours == 12) time = `${timeHours}:${timeMinutes} pm`;
  else {
    timeHours = timeHours - 12;
    time = `${timeHours}:${timeMinutes} pm`;
  }
  return time;
}