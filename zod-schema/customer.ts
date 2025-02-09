import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { customers } from "@/db/schema";
import { z } from "zod";

export const insertCustomerSchema = createInsertSchema(customers, {
  firstName: (schema) =>
    schema.refine((val) => val.length > 0, {
      message: "First name is required",
    }),
  lastName: (schema) =>
    schema.refine((val) => val.length > 0, {
      message: "Last name is required",
    }),
  address1: (schema) =>
    schema.refine((val) => val.length > 0, { message: "Address is required" }),
  city: (schema) =>
    schema.refine((val) => val.length > 0, { message: "City is required" }),
  state: (schema) =>
    schema.refine((val) => val.length === 2, {
      message: "State must be exactly 2 characters",
    }),
  email: (schema) =>
    schema.refine((val) => z.string().email().safeParse(val).success, {
      message: "Invalid email address",
    }),
  zip: (schema) =>
    schema.refine((val) => /^\d{5}(-\d{4})?$/.test(val), {
      message:
        "Invalid Zip code. Use 5 digits or 5 digits followed by a hyphen and 4 digits",
    }),
  phone: (schema) =>
    schema.refine((val) => /^\d{3}-\d{3}-\d{4}$/.test(val), {
      message: "Invalid phone number format. Use XXX-XXX-XXXX",
    }),
});

export const selectCustomerSchema = createSelectSchema(customers);

export type insertCustomerSchemaType = typeof insertCustomerSchema._type;

export type selectCustomerSchemaType = typeof selectCustomerSchema._type;
