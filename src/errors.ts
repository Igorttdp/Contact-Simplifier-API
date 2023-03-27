import { Request, Response, NextFunction } from "express";

class AppError extends Error {
  public statusCode;

  constructor(message: string, statusCode: number = 400) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.error(err)

  return res.status(500).json({ message: "Internal Server Error" });
};

export { AppError, errorHandler };
