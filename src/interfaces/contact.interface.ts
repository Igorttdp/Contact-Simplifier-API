import { IUserRequest } from "./user.interface";

export interface IContactRequest
  extends Omit<IUserRequest, "password" | "confirmPassword"> {
  secundary_email?: string;
}

export interface IUpdateContactRequest {
  id?: string;
  name?: string;
  email?: string;
  secundary_email?: string | null;
  phone?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IContactResponse {
  id: string;
  name: string;
  email: string;
  secundary_email?: string | null;
  phone: string;
  created_at: Date;
  updated_at: Date;
}
