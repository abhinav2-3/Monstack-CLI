import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { asyncHandler } from '@/shared/utils/asyncHandler';
import { getHealthStatus } from '@/services/health.service';

export const getHealth = asyncHandler(async (_req: Request, res: Response) => {
  const healthStatus = await getHealthStatus();
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Server is healthy',
    data: healthStatus,
  });
});
