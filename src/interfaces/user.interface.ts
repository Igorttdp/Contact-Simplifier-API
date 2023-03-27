import { IContactResponse } from "./contact.interface";

export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

export interface ICreateUserResponse
  extends Omit<IUserRequest, "password" | "confirmPassword"> {
  id: string;
  created_at: Date;
  updated_at: Date;
}

export interface IUserResponse extends ICreateUserResponse {
  contacts: IContactResponse[];
}

export type ILogin = Pick<IUserRequest, "email" | "password">;

export interface IUpdateUserRequest {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
}

export interface IUpdateUserResponse extends IUpdateUserRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: Date;
  updated_at: Date;
}
