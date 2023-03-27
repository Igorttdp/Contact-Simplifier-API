import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";

const retrieveContactsService = async (id: string) => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const contacts = contactRepository
    .createQueryBuilder("contact")
    .leftJoin("contact.user", "user")
    .where("user.id = :id", { id: id })
    .getMany();

  return contacts;
};

export default retrieveContactsService;
