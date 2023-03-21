const URL = 'https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,weathercode,surface_pressure,windspeed_10m,temperature_80m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_probability_max&current_weather=true&';
let json;

export async function pullWeather(){
    const url = (
        URL + new URLSearchParams({ 
            latitude: 20.36, 
            longitude: -87.59,
            timezone: 'America/Jamaica'
        })
      );
    try {
        const response = await fetch(url);
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
