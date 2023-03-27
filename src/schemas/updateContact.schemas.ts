import * as yup from "yup";
import {
  IContactRequest,
  IContactResponse,
  IUpdateContactRequest,
} from "../interfaces/contact.interface";

export const updateContactRequestSchema: yup.Schema<IUpdateContactRequest> = yup
  .object()
  .shape({
    name: yup.string().min(2).max(50).optional(),
    email: yup.string().email("Must be a valid email").optional(),
    secundary_email: yup.string().email().optional(),
    phone: yup.string().min(10).max(11).optional(),
  });

export const updateContactResponseSchema: yup.Schema<IContactResponse> = yup
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
