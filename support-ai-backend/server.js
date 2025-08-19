import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'express-async-errors';
import authRoutes from "./src/routes/auth.js";

import webhookRouter from './src/routes/webhooks.js';
import mongoose from 'mongoose';
import connectDB from './src/db.js';
import ticketRoutes from './src/routes/ticketRoutes.js'; // Import ticket routes    

const app = express();

connectDB().then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log("server started at port", process.env.PORT || 3000);
    });
}).catch(err => {
    console.log("Connection Failed!!!", err);
});




app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/webhook', webhookRouter);
app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Error handler (should be last)
app.use((err, req, res, next) => {
  console.error('Unhandled:', err);
  res.status(500).json({ error: 'internal_error' });
});

