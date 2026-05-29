import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import pinoHttp from 'pino-http';
import { logger } from '@/shared/logger/logger';
import { errorHandler } from '@/shared/middlewares/errorHandler';
import routes from '@/routes';

const app: Application = express();

// Security Middlewares
app.use(helmet());
app.use(cors());
app.use(compression());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Global Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(pinoHttp({ logger }));

// API Routes
app.use('/api/v1', routes);

// Error Handling
app.use(errorHandler);

export default app;
