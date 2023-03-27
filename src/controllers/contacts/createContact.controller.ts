import { Request, Response } from "express";
import { createContactService } from "../../services/contacts";

const createContactController = async (req: Request, res: Response) => {
  const response = await createContactService(req.body, req.user.id);

  return res.status(201).json(response);
};

export default createContactController;
