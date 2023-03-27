import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { AppError } from "../../errors";
import { IContactRequest } from "../../interfaces/contact.interface";
import { createContactResponseSchema } from "../../schemas/createContact.schemas";

const updateContactService = async (
  payload: IContactRequest,
  contactId: string
) => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const contact = await contactRepository.findOneBy({ id: contactId });

  if (!contact) throw new AppError("Contact not found", 404);

  for (const attr in payload) {
    (contact as any)[attr] = (payload as any)[attr];
  }

  await contactRepository.save(contact);

  const validatedContact = createContactResponseSchema.validateSync(contact, {
    stripUnknown: true,
    abortEarly: false,
  });

  return validatedContact;
};

export default updateContactService;
