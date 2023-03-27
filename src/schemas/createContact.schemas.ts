import * as yup from "yup";
import {
  IContactRequest,
  IContactResponse,
} from "../interfaces/contact.interface";

export const createContactRequestSchema: yup.Schema<IContactRequest> = yup
  .object()
  .shape({
    name: yup.string().min(2).max(50).required(),
    email: yup.string().email("Must be a valid email").required(),
    secundary_email: yup.string().email().optional(),
    phone: yup.string().min(10).max(11).required(),
  });

export const createContactResponseSchema: yup.Schema<IContactResponse> = yup
  .object()
  .shape({
    id: yup.string().uuid().required(),
    name: yup.string().min(2).max(50).required(),
    email: yup.string().email("Must be a valid email").required(),
    secundary_email: yup.string().nullable().email(),
    phone: yup.string().min(10).max(11).required(),
    created_at: yup.date().required(),
    updated_at: yup.date().required(),
  });
