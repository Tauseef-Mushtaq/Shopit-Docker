import dotenv from 'dotenv';
dotenv.config({ path: './config/config.env' });

import express from 'express';
const app = express();
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/errors.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

//Handle uncaught Exception
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err}`);
  console.log('Shutting down the server due to Uncaught Exception');
  process.exit(1);
});

// Database Connection
import { connectDatabase } from './config/dbConnect.js';
connectDatabase();

app.use(
  express.json({
    limit: '10mb',
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  }),
);
app.use(cookieParser());

//importing Routes
import productRoutes from './routes/products.js';
import authRoutes from './routes/auth.js';
import orderRoutes from './routes/order.js';
import paymentRoutes from './routes/payment.js';
app.use('/api/v1', productRoutes);
app.use('/api/v1', authRoutes);
app.use('/api/v1', orderRoutes);
app.use('/api/v1', paymentRoutes);

if (process.env.NODE_ENV === 'PRODUCTION') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
  });
}

// Middleware for Errors
app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`,
  );
});

// Handle Unhandled Promise Rejections

process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err}`);
  console.log('Shutting down the server due to Unhandled Promise Rejections.');
  server.close(() => {
    process.exit(1);
  });
});
