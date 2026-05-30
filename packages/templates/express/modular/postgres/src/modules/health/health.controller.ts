import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { asyncHandler } from '@/shared/utils/asyncHandler';
import { prisma } from '@/infrastructure/database/prisma';

export const getHealth = asyncHandler(async (_req: Request, res: Response) => {
  let dbStatus = 'connected';
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch (error) {
    dbStatus = 'disconnected';
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Server is healthy',
    data: {
      status: 'UP',
      database: dbStatus,
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    },
  });
});
