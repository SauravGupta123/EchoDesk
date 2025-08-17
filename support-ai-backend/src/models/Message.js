const { Schema, model } = require('mongoose');

const MessageSchema = new Schema(
  {
    from: String,        // phone number (WhatsApp)
    name: String,        // contact profile name
    text: String,        // message body
    platform: { type: String, default: 'whatsapp' },
    direction: { type: String, enum: ['inbound', 'outbound'], default: 'inbound' },
    raw: Object          // store full webhook payload for debugging
  },
  { timestamps: true }
);

module.exports = model('Message', MessageSchema);
