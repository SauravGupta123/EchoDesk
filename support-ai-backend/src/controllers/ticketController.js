// controllers/ticketController.js
import Ticket from "../models/Ticket.js";
import Message from "../models/Message.js";

// Create ticket when new message arrives
export const createTicket = async (customerNumber, messageId) => {
  let ticket = await Ticket.findOne({ customerNumber, status: "open" });

  if (!ticket) {
    ticket = new Ticket({
      customerNumber,
      messages: [messageId],
    });
  } else {
    ticket.messages.push(messageId);
  }

  await ticket.save();
  return ticket;
};

// Get all tickets
export const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate("messages")
      .populate("assignedTo", "name role");
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update ticket (assign agent or change status)
export const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { assignedTo, status, priority } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
      id,
      { assignedTo, status, priority },
      { new: true }
    );

    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getTicketsByRole = async (req, res) => {
  try {
    const userRole = req.user.role; // comes from auth middleware
    let tickets;

    if (userRole === "junior") {
      tickets = await Ticket.find({ assignedTo: null, status: "open" })
        .populate("messages")
        .populate("assignedTo", "name role");
    } else if (userRole === "mid") {
      tickets = await Ticket.find({ status: "open" })
        .populate("messages")
        .populate("assignedTo", "name role");
      // (you can later add condition for "mid" escalation logic)
    } else if (userRole === "senior") {
      tickets = await Ticket.find()
        .populate("messages")
        .populate("assignedTo", "name role");
    } else {
      return res.status(403).json({ error: "Invalid role" });
    }

    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const assignTicket = async (req, res) => {
  try {
    const { id } = req.params; // ticket ID
    const { assignedTo } = req.body; // agent user ID

    const ticket = await Ticket.findByIdAndUpdate(
      id,
      { assignedTo },
      { new: true }
    ).populate("assignedTo", "name role");

    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const replyToTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { text } = req.body;
    const agentId = req.user._id;

    // 1. Find ticket
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });

    const customerNumber = ticket.customerNumber;

    // 2. Send WhatsApp message via Meta API
    await axios.post(
      `https://graph.facebook.com/v18.0/${process.env.PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: customerNumber,
        text: { body: text },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.META_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    // 3. Save outbound message
    const newMessage = await Message.create({
      from: agentId,
      name: req.user.name,
      text,
      direction: "outbound",
      platform: "whatsapp",
    });

    ticket.messages.push(newMessage._id);
    await ticket.save();

    res.json({ success: true, message: newMessage });
  } catch (err) {
    console.error("Reply error:", err.response?.data || err.message);
    res.status(500).json({ error: err.message });
  }
};