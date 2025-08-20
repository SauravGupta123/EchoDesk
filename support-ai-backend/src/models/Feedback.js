import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  ticket: { type: mongoose.Schema.Types.ObjectId, ref: "Ticket", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: { type: String, enum: ["up", "down"], required: true }, // 👍 or 👎
  comment: { type: String },
  correction: { type: String }, // If human agent corrects Gemini's response
}, { timestamps: true });

export default mongoose.model("Feedback", feedbackSchema);
