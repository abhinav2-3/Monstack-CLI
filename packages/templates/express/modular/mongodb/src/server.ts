import http from 'http';
import app from './app';
import { env } from '@/config/env';
import { logger } from '@/shared/logger/logger';
import { connectDB } from '@/infrastructure/database/connectDB';
import mongoose from 'mongoose';

const server = http.createServer(app);

const startServer = async () => {
  try {
    await connectDB();
    server.listen(env.port, () => {
      logger.info(
        `Server is running in ${env.nodeEnv} mode on port ${env.port}`,
      );
    });
  } catch (error) {
    logger.error('Error starting server:', error);
    process.exit(1);
  }
};

const gracefulShutdown = (signal: string) => {
  logger.info(`${signal} received. Shutting down gracefully...`);
  server.close(async () => {
    logger.info('HTTP server closed.');
    try {
      await mongoose.connection.close();
      logger.info('MongoDB connection closed.');
      process.exit(0);
    } catch (err) {
      logger.error('Error during MongoDB disconnection:', err);
      process.exit(1);
    }
  });

  // If server doesn't close in 10s, force shutdown
  setTimeout(() => {
    logger.error(
      'Could not close connections in time, forcefully shutting down',
    );
    process.exit(1);
  }, 10000);
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  gracefulShutdown('unhandledRejection');
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception thrown:', error);
  gracefulShutdown('uncaughtException');
});

startServer();
