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