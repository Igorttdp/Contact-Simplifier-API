import { Request, Response } from "express";
import { loginService } from "../../services/users";

const loginUserController = async (req: Request, res: Response) => {
  const response = await loginService(req.body);

  return res.status(200).json(response);
};

export default loginUserController;
