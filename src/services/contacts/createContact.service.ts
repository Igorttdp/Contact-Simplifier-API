import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { IContactRequest } from "../../interfaces/contact.interface";
import { createContactResponseSchema } from "../../schemas/createContact.schemas";

const createContactService = async (payload: IContactRequest, id: string) => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const contact = contactRepository.create(payload);

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id });

  if (!user) throw new AppError("Invalid user", 400);

  contact.user = user;
  await contactRepository.save(contact);

  console.log(contact);

  const validatedContact = createContactResponseSchema.validateSync(contact, {
    stripUnknown: true,
    abortEarly: false,
  });

  return validatedContact;
};

export default createContactService;
