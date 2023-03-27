import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { AppError } from "../../errors";

const deleteContactService = async (contactId: string) => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const contact = await contactRepository.findOneBy({ id: contactId });

  if (!contact) throw new AppError("Contact not found", 404);

  await contactRepository.remove(contact)
};

export default deleteContactService;
