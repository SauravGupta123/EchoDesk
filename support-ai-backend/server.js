import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'express-async-errors';
import authRoutes from "./src/routes/auth.js";
// import connectDB from './src/db.js';
import webhookRouter from './src/routes/webhooks.js';
import mongoose from 'mongoose';
import connectDB from './src/db.js';

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/webhook', webhookRouter);
app.use("/api/auth", authRoutes);
// error handler
app.use((err, req, res, next) => {
  console.error('Unhandled:', err);
  res.status(500).json({ error: 'internal_error' });
});


connectDB();
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));