import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { customers } from "@/db/schema";
import { z } from "zod";

export const insertCustomerSchema = createInsertSchema(customers, {
  firstName: (schema) =>
    schema.refine((val) => val.length > 0, {
      message: "Prénom requis",
    }),
  lastName: (schema) =>
    schema.refine((val) => val.length > 0, {
      message: "Nom requis",
    }),
  address1: (schema) =>
    schema.refine((val) => val.length > 0, { message: "Adresse requise" }),
  email: (schema) =>
    schema.refine((val) => z.string().email().safeParse(val).success, {
      message: "Adresse email non valide",
    }),
  phone: (schema) =>
    schema.refine((val) => /^\d{3}-\d{3}-\d{4}$/.test(val), {
      message: "Invalid phone number format. Use XXX-XXX-XXXX",
    }),
});

export const selectCustomerSchema = createSelectSchema(customers);

export type insertCustomerSchemaType = typeof insertCustomerSchema._type;
export type selectCustomerSchemaType = typeof selectCustomerSchema._type;
