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
