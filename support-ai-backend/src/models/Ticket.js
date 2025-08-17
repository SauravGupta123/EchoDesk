// models/Ticket.js
import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    customerNumber: { type: String, required: true }, // WhatsApp number
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // junior/mid/senior
    status: {
      type: String,
      enum: ["open", "in-progress", "closed"],
      default: "open",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Ticket", ticketSchema);
