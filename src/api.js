// 2. src/api.js
// External API Integration (e.g., Weather API)
const fetch = require('node-fetch');

async function fetchWeather() {
    const apiKey = 'your_openweather_api_key'; // Replace with your API key
    const city = 'New York'; // Example city
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    const data = await response.json();
    if (data.weather) {
        return `The weather in ${city} is ${data.weather[0].description} with a temperature of ${(data.main.temp - 273.15).toFixed(1)}°C.`;
    }
    return "Sorry, I couldn't fetch the weather information.";
}

module.exports = { fetchWeather };