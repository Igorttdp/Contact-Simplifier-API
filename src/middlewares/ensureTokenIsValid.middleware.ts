import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors";

const ensureTokenIsValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) throw new AppError("Missing authorization headers", 400);

  jwt.verify(authorization.split(" ")[1], process.env.SECRET_KEY!, (err, decoded) => {
    if (err) throw new AppError(err.message, 401);

    req.user = {
      id: decoded!.sub as string,
    };

    return next();
  });
};

export default ensureTokenIsValid;
