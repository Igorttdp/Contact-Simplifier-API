import { Request, Response } from "express";
import { retrieveContactsService } from "../../services/contacts";

const retrieveContactsController = async (req: Request, res: Response) => {
  const response = await retrieveContactsService(req.user.id);
  return res.status(200).json(response);
};

export default retrieveContactsController
