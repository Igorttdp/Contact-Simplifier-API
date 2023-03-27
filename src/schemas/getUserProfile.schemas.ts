import * as yup from "yup";
import { IUserResponse } from "../interfaces/user.interface";

export const getUserProfileSchema: yup.Schema<IUserResponse> = yup
  .object()
  .shape({
    id: yup.string().uuid().required(),
    name: yup.string().min(2).max(50).required(),
    email: yup.string().email("Must be a valid email").required(),
    phone: yup.string().min(10).max(11).required(),
    created_at: yup.date().required(),
    updated_at: yup.date().required(),
    contacts: yup.array().required(),
  });
