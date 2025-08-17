import express from 'express';
const router = express.Router();
import Message from '../models/Message.js'; // Ensure this path is correct

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
router.post('/', async (req, res) => {
  try {
    const body = req.body;

    if (body?.object === 'whatsapp_business_account') {
      const entry = body.entry?.[0];
      const change = entry?.changes?.[0];
      const value = change?.value;
      const messages = value?.messages;

      if (Array.isArray(messages) && messages.length) {
        const msg = messages[0];
        const from = msg.from;                                // phone
        const name = value?.contacts?.[0]?.profile?.name || '';
        let text = '';

        if (msg.type === 'text') text = msg.text?.body || '';
        else if (msg.type === 'button') text = msg.button?.text || '';
        else if (msg.type === 'interactive') {
          text = msg.interactive?.button_reply?.title ||
                 msg.interactive?.list_reply?.title || '';
        }

        await Message.create({
          from, name, text, raw: body, direction: 'inbound'
        });

        console.log(`📩 ${from} (${name}): ${text}`);
        // (We’ll add AI + auto-reply here in the next step)
      }
    }
    res.sendStatus(200);
  } catch (e) {
    console.error('Webhook error:', e);
    res.sendStatus(500);
  }
});
export default router;
