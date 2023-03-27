import { IUserResponse } from "../../interfaces/user.interface";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
      };
    }
  }
}

export {};
