import { Request, Response } from "express";
import { userProfileService } from "../../services/users";

const userProfileController = async (req: Request, res: Response) => {
  const userData = await userProfileService(req.user.id);

  return res.status(200).json(userData);
};

export default userProfileController;
