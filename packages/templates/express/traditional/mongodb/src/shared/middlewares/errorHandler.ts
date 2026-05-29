import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '@/shared/errors/AppError';
import { logger } from '@/shared/logger/logger';
import { env } from '@/config/env';

export const errorHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let message = 'Something went wrong';
  let success = false;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else {
    // Unknown errors
    logger.error('Unhandled Error:', err);
    message =
      env.nodeEnv === 'production' ? 'Internal Server Error' : err.message;
  }

  res.status(statusCode).json({
    success,
    message,
    stack: env.nodeEnv === 'development' ? err.stack : undefined,
  });
};
