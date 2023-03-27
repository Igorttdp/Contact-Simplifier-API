import { Request, Response } from "express";
import { updateContactService } from "../../services/contacts";

const updateContactController = async (req: Request, res: Response) => {
  const { contactId } = req.params;
  const response = await updateContactService(req.body, contactId);

  return res.status(200).json(response);
};

export default updateContactController;
