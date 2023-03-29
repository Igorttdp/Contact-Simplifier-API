import { IUserRequest } from "../../interfaces/user.interface";
import { User } from "../../entities/user.entity";
import AppDataSource from "../../data-source";
import { createUserResponseSchema } from "../../schemas/createUser.schemas";

const createUserService = async (payload: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = userRepository.create(payload);
  await userRepository.save(user);

  const validatedBody = createUserResponseSchema.validateSync(user, {
    abortEarly: false,
    stripUnknown: true,
  });

  return validatedBody;
};

export default createUserService;
