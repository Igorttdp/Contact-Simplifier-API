import * as yup from "yup";
import { ICreateUserResponse, IUserRequest } from "../interfaces/user.interface";

export const createUserRequestSchema: yup.Schema<IUserRequest> = yup
  .object()
  .shape({
    name: yup.string().min(2).max(50).required(),
    email: yup.string().email("Must be a valid email").required(),
    password: yup.string().min(6).max(120).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Password must match")
      .required(),
    phone: yup.string().min(10).max(11).required(),
  });

export const createUserResponseSchema: yup.Schema<ICreateUserResponse> = yup
  .object()
  .shape({
    id: yup.string().uuid().required(),
    name: yup.string().min(2).max(50).required(),
    email: yup.string().email("Must be a valid email").required(),
    phone: yup.string().min(10).max(11).required(),
    created_at: yup.date().required(),
    updated_at: yup.date().required(),
  });
