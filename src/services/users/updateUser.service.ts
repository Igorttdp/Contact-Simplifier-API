import { hashSync } from "bcryptjs";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { IUpdateUserRequest } from "../../interfaces/user.interface";
import { updateUserResponseSchema } from "../../schemas/updateUser.schemas";

const updateUserService = async (payload: IUpdateUserRequest, id: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id });

  if (!user) throw new AppError("User not found", 400);

  for (const attr in payload) {
    if (attr === "password" && payload["password"]) {
      (user as any)[attr] = hashSync(payload["password"], 10);
    } else {
      (user as any)[attr] = (payload as any)[attr];
    }
  }

  await userRepository.save(user);

  console.log(user);

  const userWithoutPassword = updateUserResponseSchema.validateSync(user, {
    stripUnknown: true,
    abortEarly: false,
  });

  return userWithoutPassword;
};

export default updateUserService;
