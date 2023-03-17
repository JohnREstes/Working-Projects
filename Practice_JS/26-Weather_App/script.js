const URL = 'https://api.open-meteo.com/v1/forecast?latitude=20.36&longitude=-87.59&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,weathercode,surface_pressure,windspeed_10m,temperature_80m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_probability_max&current_weather=true&timezone=America%2FJamaica';
const ICON_CODES = {
  0: "./img/day.svg", 
  1: "./img/cloudy-day-1.svg",
  2: "./img/cloudy-day-2.svg",
  3: "./img/cloudy-day-3.svg",
  45: "./img/fog.svg",
  48: "./img/fog.svg",  
  51: "./img/rainy-1.svg",
  53: "./img/rainy-4.svg",
  55: "./img/rainy-7.svg",
  56: "./img/snowy-1.svg",
  57: "./img/snowy-2.svg",
  61: "./img/rainy-1.svg",
  63: "./img/rainy-4.svg",
  65: "./img/rainy-7.svg", 
  66: "./img/snowy-1.svg",
  67: "./img/snowy-2.svg",  
  71: "./img/snowy-4.svg",
  73: "./img/snowy-5.svg",  
  75: "./img/snowy-6.svg",
  77: "./img/snowy-7.svg",
  80: "./img/rainy-1.svg",
  81: "./img/rainy-4.svg",
  82: "./img/rainy-7.svg", 
  85: "./img/snowy-1.svg",
  86: "./img/snowy-7.svg",
  95: "./img/thunder.svg",  
  96: "./img/thunder.svg",  
  99: "./img/thunder.svg" 
}

const current = document.querySelectorAll(`[data-current]`);
const forecast = document.querySelectorAll(`[data-forecast]`);
let json;

pullWeather();

async function pullWeather(){
    try {
        const response = await fetch(URL);
        json = await response.json();
      } catch (error) {
        if (error instanceof SyntaxError) {
          // Unexpected token < in JSON
          console.log('There was a SyntaxError', error);
        } else {
          console.log('There was an error', error);
        }
      }
      
      if (json) {
        console.log('Use the JSON here!', json);
        buildDay();
        buildForecast();
      }
}
function findKey(object, value){
  return Object.keys(object).find(key => key == value);
}
function buildDay(){
  current.forEach(field =>{
    switch (field.dataset.current ) {
      case 'icon':
        let weatherCode = json.current_weather.weathercode;
        let weatherKey = findKey(ICON_CODES, weatherCode);
        field.style.backgroundImage = `url('${ICON_CODES[weatherKey]}')`;  
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
        field.innerHTML = `${json.daily.sunrise[0].slice(11)}`;
        break;
      case 'sunset':
        field.innerHTML = `${json.daily.sunset[0].slice(11)}`;
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
          let weatherKey = findKey(ICON_CODES, weatherCode);
          dailyForecast[i].style.backgroundImage = `url('${ICON_CODES[weatherKey]}')`;  
          break;
        case 'temp':
          dailyForecast[i].innerHTML = `${json.daily.temperature_2m_max[index]} &#8451`;
          break;
        case 'day':
          let tempDate = new Date(`${json.daily.time[index]}, 12:00`).toLocaleString('en-US', { weekday: 'long',});
          dailyForecast[i].innerHTML = `${tempDate}`;
          break;
        default:
          break;
      };
    };
  });
}