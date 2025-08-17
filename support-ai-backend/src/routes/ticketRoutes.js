// routes/ticketRoutes.js
import express from "express";
import { getTickets, updateTicket } from "../controllers/ticketController.js";
// import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Admin/junior/mid/senior can view tickets
router.get("/", getTickets);

// Update ticket (assign agent or close)
router.put("/:id", updateTicket);

export default router;
