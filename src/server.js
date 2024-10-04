import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';

export const setupServer = () => {
  const app = express();
  const PORT = Number(env('PORT', '3000'));

  app.use(express.json());
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.use((req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((error, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
