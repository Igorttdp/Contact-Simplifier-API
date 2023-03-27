import * as yup from "yup";
import {
  IUpdateUserRequest,
  IUpdateUserResponse,
  IUserRequest,
  IUserResponse,
} from "../interfaces/user.interface";

export const updateUserRequestSchema: yup.Schema<IUpdateUserRequest> = yup
  .object()
  .shape({
    name: yup.string().min(2).max(50).optional(),
    email: yup.string().email("Must be a valid email").optional(),
    password: yup.string().min(6).max(120).optional(),
    confirmPassword: yup.string().when("password", {
      is: (val: string) => !!val,
      then: (schema) =>
        schema.oneOf([yup.ref("password")], "Password must match").required(),
    }),

    phone: yup.string().min(10).max(11).optional  (),
  });

export const updateUserResponseSchema: yup.Schema<IUpdateUserResponse> = yup
  .object()
  .shape({
    id: yup.string().uuid().required(),
    name: yup.string().min(2).max(50).required(),
    email: yup.string().email("Must be a valid email").required(),
    phone: yup.string().min(10).max(11).required(),
    created_at: yup.date().required(),
    updated_at: yup.date().required(),
  });
