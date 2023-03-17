const URL = 'https://api.open-meteo.com/v1/forecast?latitude=20.36&longitude=-87.59&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,weathercode,surface_pressure,windspeed_10m,temperature_80m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_probability_max&current_weather=true&timezone=America%2FJamaica';
const ICON_CODES = {
  0: "./img/day.svg", 
  1: "./img/cloudy-day-1.svg",
  2: "./img/cloudy-day-2.svg",
  3: "./img/cloudy-day-3.svg",
  45: "./img/fog.svg",
  48: "./img/fog.svg",  
  51: "./img/rainy-1.svg.svg",
  53: "./img/rainy-4.svg.svg",
  55: "./img/rainy-7.svg.svg",
  56: "./img/snowy-1.svg",
  57: "./img/snowy-2.svg",
  61: "./img/rainy-1.svg.svg",
  63: "./img/rainy-4.svg.svg",
  65: "./img/rainy-7.svg.svg", 
  66: "./img/snowy-1.svg",
  67: "./img/snowy-2.svg",  
  71: "./img/snowy-4.svg",
  73: "./img/snowy-5.svg",  
  75: "./img/snowy-6.svg",
  77: "./img/snowy-7.svg",
  80: "./img/rainy-1.svg.svg",
  81: "./img/rainy-4.svg.svg",
  82: "./img/rainy-7.svg.svg", 
  85: "./img/snowy-1.svg",
  86: "./img/snowy-7.svg",
  95: "./img/thunder.svg",  
  96: "./img/thunder.svg",  
  99: "./img/thunder.svg" 
}

const current = document.querySelectorAll(`[data-current]`);
const forecastOne = document.querySelectorAll(`[data-forecast-one]`);
const forecastTwo = document.querySelectorAll(`[data-forecast-two]`);
const forecastThree = document.querySelectorAll(`[data-forecast-three]`);
const forecastFour = document.querySelectorAll(`[data-forecast-four]`);
const forecastFive = document.querySelectorAll(`[data-forecast-five]`);
const forecastSix = document.querySelectorAll(`[data-forecast-six]`);
const forecastSeven = document.querySelectorAll(`[data-forecast-seven]`);
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
        console.log(forecastOne);
      }
}

function buildDay(){
  current.forEach(field =>{
    switch (field.dataset.current ) {
      case 'icon':
        let weatherCode = json.current_weather.weathercode;
        let srcTemp = Object.keys(ICON_CODES).find(key => key == weatherCode);
        field.style.backgroundImage = `url('${ICON_CODES[srcTemp]}')`;  
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