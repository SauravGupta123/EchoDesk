import express from 'express';
const router = express.Router();
import Message from '../models/Message.js';
import { createTicket } from '../controllers/ticketController.js';
import axios from 'axios';
import { getAIResponse } from '../../utils/gemini.js'; // Assuming you have a utility to get AI responses
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
// router.post('/', async (req, res) => {
//   try {
//     const body = req.body;

//     if (body?.object === 'whatsapp_business_account') {
//       const entry = body.entry?.[0];
//       const change = entry?.changes?.[0];
//       const value = change?.value;
//       const messages = value?.messages;

//       if (Array.isArray(messages) && messages.length) {
//         const msg = messages[0];
//         const from = msg.from;                                // phone number
//         const name = value?.contacts?.[0]?.profile?.name || '';
//         let text = '';

//         if (msg.type === 'text') text = msg.text?.body || '';
//         else if (msg.type === 'button') text = msg.button?.text || '';
//         else if (msg.type === 'interactive') {
//           text = msg.interactive?.button_reply?.title ||
//                  msg.interactive?.list_reply?.title || '';
//         }

//         // 1️⃣ Save incoming message
//         const newMessage = await Message.create({
//           from,
//           name,
//           text,
//           raw: body,
//           direction: 'inbound'
//         });

//         // 2️⃣ Link message to a ticket
//         await createTicket(from, newMessage._id);

//         console.log(`📩 ${from} (${name}): ${text}`);
//       }
//     }
//     res.sendStatus(200);
//   } catch (e) {
//     console.error('Webhook error:', e);
//     res.sendStatus(500);
//   }
// });


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
      const from = message.from; // WhatsApp user number
      const userMessage = message.text?.body; // User message text

      console.log("Received message:", userMessage, "from:", from);
      const aiReply = await getAIResponse(userMessage);
      // console.log("AI Reply:", aiReply);
      // Reply via WhatsApp API
      await axios.post(
        `https://graph.facebook.com/v19.0/${process.env.META_PHONE_NUMBER_ID}/messages`,
        {
          messaging_product: "whatsapp",
          to: from,
          text: { body: `Thanks for your message: "${aiReply}"` }
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.META_WHATSAPP_TOKEN}`,
            "Content-Type": "application/json"
          }
        }
      );
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Error handling webhook:", error.response?.data || error);
    res.sendStatus(500);
  }
});
    

export default router;
