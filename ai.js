// AI-Powered Chatbot using JavaScript and TensorFlow.js

// File Structure:
// - src/
//   - intents.js
//   - chatbot.js
//   - api.js
// - index.js
// - package.json

// 1. src/intents.js
// Intent recognition and response mapping
const intents = {
    greeting: {
        patterns: ["hello", "hi", "hey"],
        responses: ["Hello! How can I assist you today?", "Hi there! Need help with something?"]
    },
    weather: {
        patterns: ["weather", "forecast", "rain"],
        responses: ["Let me check the weather for you. Please wait..."]
    },
    farewell: {
        patterns: ["bye", "goodbye"],
        responses: ["Goodbye! Have a great day!", "See you next time!"]
    }
};

function findIntent(input) {
    for (const intent in intents) {
        for (const pattern of intents[intent].patterns) {
            if (input.includes(pattern)) {
                return intent;
            }
        }
    }
    return null;
}

module.exports = { intents, findIntent };

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

// 3. src/chatbot.js
// Chatbot Framework
const readline = require('readline');
const { intents, findIntent } = require('./intents');
const { fetchWeather } = require('./api');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Welcome to the AI-Powered Chatbot!");

async function chat() {
    rl.question("You: ", async (input) => {
        const intent = findIntent(input.toLowerCase());

        if (intent) {
            const response = intents[intent].responses[Math.floor(Math.random() * intents[intent].responses.length)];
            console.log("Bot: " + response);

            if (intent === "weather") {
                const weatherInfo = await fetchWeather();
                console.log("Bot: " + weatherInfo);
            }
        } else {
            console.log("Bot: I'm sorry, I didn't understand that. Can you rephrase?");
        }

        chat(); // Keep the conversation going
    });
}

module.exports = { chat };

// 4. index.js
// Entry Point
const { chat } = require('./src/chatbot');
const tf = require('@tensorflow/tfjs-node');

let nlpModel;
async function loadModel() {
    console.log("Loading NLP model...");
    nlpModel = await tf.loadGraphModel('https://tfhub.dev/google/universal-sentence-encoder/4');
    console.log("Model loaded successfully.");
}

loadModel().then(chat);

// 5. package.json
/* Example package.json
{
  "name": "ai-chatbot",
  "version": "1.0.0",
  "description": "AI-powered chatbot with JavaScript",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "@tensorflow/tfjs-node": "^4.0.0",
    "node-fetch": "^2.6.7"
  }
}
*/
