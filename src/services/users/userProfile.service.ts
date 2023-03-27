import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { createUserResponseSchema } from "../../schemas/createUser.schemas";
import { getUserProfileSchema } from "../../schemas/getUserProfile.schemas";

const userProfileService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.contacts", "contacts")
    .where("user.id = :id", { id: id })
    .getOne();

  const userWithoutPassword = getUserProfileSchema.validateSync(user, {
    stripUnknown: true,
  });

  return userWithoutPassword;
};

export default userProfileService;
