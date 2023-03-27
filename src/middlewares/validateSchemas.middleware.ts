import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";
import { AppError } from "../errors";

const validateSchemasMiddleware =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = await schema.validate(req.body, {
        stripUnknown: true,
        abortEarly: false,
      });

      req.body = validatedData;
      return next();
    } catch (err: any) {
      throw new AppError(err.errors, 400);
    }
  };

export default validateSchemasMiddleware;
