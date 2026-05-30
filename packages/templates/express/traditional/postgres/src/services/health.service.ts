import { prisma } from '@/config/prisma';

export const checkHealth = async () => {
  let dbStatus = 'connected';
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch (error) {
    dbStatus = 'disconnected';
  }

  return {
    status: 'ok',
    database: dbStatus,
    timestamp: new Date().toISOString(),
  };
};
