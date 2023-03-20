const URL = 'https://api.open-meteo.com/v1/forecast?latitude=20.36&longitude=-87.59&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,weathercode,surface_pressure,windspeed_10m,temperature_80m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_probability_max&current_weather=true&timezone=America%2FJamaica';
let json;

export async function pullWeather(){
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
        console.log('JSON returned!', json);
        return json;
      }
}