require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('express-async-errors');

const connectDB = require('./src/db');
const webhookRouter = require('./src/routes/webhooks');

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/webhook', webhookRouter);

// error handler
app.use((err, req, res, next) => {
  console.error('Unhandled:', err);
  res.status(500).json({ error: 'internal_error' });
});

const PORT = process.env.PORT || 3000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`API running on :${PORT}`));
});
