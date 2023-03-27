import { Router } from "express";
import {
  createContactController,
  deleteContactController,
  retrieveContactsController,
  updateContactController,
} from "../controllers/contacts";
import {
  ensureTokenIsValidMiddleware,
  validateSchemasMiddleware,
} from "../middlewares";
import { createContactRequestSchema } from "../schemas/createContact.schemas";
import { updateContactRequestSchema } from "../schemas/updateContact.schemas";

const contactRoutes = Router();

contactRoutes.post(
  "/contacts",
  ensureTokenIsValidMiddleware,
  validateSchemasMiddleware(createContactRequestSchema),
  createContactController
);

contactRoutes.get(
  "/contacts",
  ensureTokenIsValidMiddleware,
  retrieveContactsController
);

contactRoutes.patch(
  "/contacts/:contactId",
  ensureTokenIsValidMiddleware,
  validateSchemasMiddleware(updateContactRequestSchema),
  updateContactController
);

contactRoutes.delete(
  "/contacts/:contactId",
  ensureTokenIsValidMiddleware,
  deleteContactController
);

export default contactRoutes;
