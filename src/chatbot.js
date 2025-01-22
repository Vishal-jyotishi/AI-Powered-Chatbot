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