import * as yup from "yup";
import { ILogin } from "../interfaces/user.interface";

const loginUserSchema: yup.Schema<ILogin> = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default loginUserSchema;
