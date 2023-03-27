import { compareSync } from "bcryptjs";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { ILogin } from "../../interfaces/user.interface";
import jwt from "jsonwebtoken";
import { createUserResponseSchema } from "../../schemas/createUser.schemas";

const loginService = async ({ email, password }: ILogin) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository
    .createQueryBuilder("user")
    .leftJoin("user.contacts", "contacts")
    .where("user.email = :email", { email: email })
    .getOne();

  if (!user) throw new AppError("Invalid Credentials");

  const comparePass = compareSync(password, user.password);

  if (!comparePass) throw new AppError("Invalid Credentials");

  const token = jwt.sign({ email }, process.env.SECRET_KEY!, {
    subject: user.id,
    expiresIn: "2h",
  });

  return { token };
};

export default loginService;
