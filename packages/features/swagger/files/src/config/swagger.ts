import swaggerJsdoc from 'swagger-jsdoc';
import { env } from './env';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MonStack API',
      version: '1.0.0',
      description: 'API documentation for MonStack generated project',
    },
    servers: [
      {
        url: `http://localhost:${env.port}/api/v1`,
      },
    ],
  },
  apis: ['./src/modules/**/*.routes.ts', './src/routes.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
