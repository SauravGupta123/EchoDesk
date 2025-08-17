// routes/ticketRoutes.js
import express from "express";
import { getTickets, updateTicket,assignTicket,replyToTicket } from "../controllers/ticketController.js";
// import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Admin/junior/mid/senior can view tickets
router.get("/", getTickets);

// Update ticket (assign agent or close)
router.put("/:id", updateTicket);
router.put("/:id/assign", assignTicket);
router.post("/:ticketId/reply", replyToTicket);

export default router;
