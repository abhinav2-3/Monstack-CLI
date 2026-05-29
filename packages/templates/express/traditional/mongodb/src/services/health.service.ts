import { logger } from '@/shared/logger/logger';
import mongoose from 'mongoose';

export const getHealthStatus = async () => {
  const dbStatus =
    mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';

  return {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: dbStatus,
  };
};
