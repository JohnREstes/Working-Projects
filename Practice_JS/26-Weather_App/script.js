const URL = 'https://api.open-meteo.com/v1/forecast?latitude=20.36&longitude=-87.59&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,weathercode,cloudcover,windspeed_10m&daily=weathercode,temperature_2m_max,apparent_temperature_max,apparent_temperature_min,precipitation_probability_max,windspeed_10m_max&current_weather=true&timezone=America%2FJamaica';

const data = document.querySelectorAll(`[data-current]`);
const forecast = document.querySelectorAll(`[data-forecast]`);
let json;

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
        console.log(data);
        console.log(forecast);
      }
}
pullWeather();