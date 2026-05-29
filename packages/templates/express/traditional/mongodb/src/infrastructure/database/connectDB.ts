import mongoose from 'mongoose';
import { logger } from '@/shared/logger/logger';
import { env } from '@/config/env';

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(env.mongoUri);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};
