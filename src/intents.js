// AI-Powered Chatbot using JavaScript and TensorFlow.js
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