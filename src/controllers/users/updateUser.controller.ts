import { Request, Response } from "express";
import { updateUserService } from "../../services/users";

const updateUserController = async (req: Request, res: Response) => {
  const response = await updateUserService(req.body, req.user.id);

  return res.status(200).json(response);
};

export default updateUserController;
