import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const validateEnv = () => {
  const requiredEnv = ['NODE_ENV', 'PORT', 'DATABASE_URL'];
  const missingEnv = requiredEnv.filter((env) => !process.env[env]);

  if (missingEnv.length > 0) {
    throw new Error(
      `Config validation error: missing env variables: ${missingEnv.join(', ')}`,
    );
  }
};

validateEnv();

export const env = {
  nodeEnv: process.env.NODE_ENV as string,
  port: parseInt(process.env.PORT as string, 10),
  databaseUrl: process.env.DATABASE_URL as string,
};
