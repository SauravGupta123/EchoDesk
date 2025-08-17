import 'dotenv/config';
import { getAIResponse } from './gemini.js';

const userMessage = "Where is my order #12345? It hasn't arrived yet.";
// console.log("User Message:", userMessage);  
getAIResponse(userMessage)
  .then(reply => {
    console.log("Gemini reply:", reply);
  })
  .catch(err => {
    console.error("Error:", err);
  });