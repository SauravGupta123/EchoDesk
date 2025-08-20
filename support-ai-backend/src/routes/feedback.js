import express from "express";
import Feedback from "../models/Feedback.js";
import Ticket from "../models/Ticket.js";

const router = express.Router();

// Submit feedback for a ticket
router.post("/", async (req, res) => {
  try {
    const { ticketId, rating, comment, correction, userId } = req.body;
    const feedback = await Feedback.create({
      ticket: ticketId,
      user: userId,
      rating,
      comment,
      correction,
    });
    // Optionally, update ticket status if feedback is negative
    if (rating === "down" && correction) {
      await Ticket.findByIdAndUpdate(ticketId, { status: "in-progress" });
      // TODO: Add correction to vector DB for RAG improvement
    }
    res.status(201).json({ feedback });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get feedback for a ticket
router.get("/:ticketId", async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ ticket: req.params.ticketId });
    res.json({ feedbacks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
