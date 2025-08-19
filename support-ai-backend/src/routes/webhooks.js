
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const router = express.Router();
import Message from '../models/Message.js';
import Faq from '../models/Faq.js';
import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from 'axios';
import { agentRouter } from '../services/langraph/agents.js';



const genAI = new
 GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const embedModel = genAI.getGenerativeModel({ model: "text-embedding-004" });
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const orderIndex = pinecone.index("orders-index");
const faqIndex = pinecone.index("faq-index"); // You need to create/seed this index

const SIMILARITY_THRESHOLD = 0.8; // Adjust as needed

// GET /webhook — Facebook verification
router.get('/', (req, res) => {
  console.log('Webhook verification request received');
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === process.env.META_VERIFY_TOKEN) {
    console.log('✅ Webhook verified');
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

// POST /webhook — incoming WhatsApp messages
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    if (
      data.object &&
      data.entry &&
      data.entry[0].changes &&
      data.entry[0].changes[0].value.messages
    ) {
      const message = data.entry[0].changes[0].value.messages[0];
      const from = message.from;
      const phoneNo= message.from;
      const userMessage = message.text?.body;

      // 1️⃣ Embed user message
      const embeddingResponse = await embedModel.embedContent(userMessage);
      const userEmbedding = embeddingResponse.embedding.values || embeddingResponse.data || embeddingResponse.embedding;

      // 2️⃣ Query Pinecone for orders
      const orderResults = await orderIndex.query({
        vector: userEmbedding,
        topK: 1,
        includeMetadata: true,
      });

      // 3️⃣ Query Pinecone for FAQ
      const faqResults = await faqIndex.query({
        vector: userEmbedding,
        topK: 1,
        includeMetadata: true,
      });

      // 4️⃣ Select best context
      let context = null;
      let contextType = null;
      if (orderResults.matches?.[0]?.score > SIMILARITY_THRESHOLD) {
        context = orderResults.matches[0].metadata.text;
        contextType = "order";
      } else if (faqResults.matches?.[0]?.score > SIMILARITY_THRESHOLD) {
        context = faqResults.matches[0].metadata.text;
        contextType = "faq";
      }

      // 5️⃣ Generate reply with Gemini
let reply;
if (userMessage) {
const result = await agentRouter.invoke({
  userMessage,
  customerNumber: from,
});

reply = result;  // cleaner access
console.log('Generated reply:', result);
   
} else {
  reply = "Sorry, I didn't understand your message. Can you rephrase?";
}
  res.json({ 
  status: "success",
  replyMsg: reply.replyMsg,
  // handledBy: rep?.source || "unknown"
});

      // 6️⃣ Send reply via WhatsApp API
      // await axios.post(
      //   `https://graph.facebook.com/v19.0/${process.env.META_PHONE_NUMBER_ID}/messages`,
      //   {
      //     messaging_product: "whatsapp",
      //     to: from,
      //     text: { body: reply }
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${process.env.META_WHATSAPP_TOKEN}`,
      //       "Content-Type": "application/json"
      //     }
      //   }
      // );
    }
    
  } catch (error) {
    console.error("Error handling webhook:", error.response?.data || error);
    res.sendStatus(500);
  }
});

export default router;
