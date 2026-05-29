import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';

export const validate =
  (schema: ZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: 'Validation failed',
          errors: error.issues.map((e) => ({
            path: e.path.join('.'),
            message: e.message,
          })),
        });
      }
      return next(error);
    }
  };
