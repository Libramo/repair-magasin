import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { tickets } from "@/db/schema";
import { z } from "zod";

export const insertTicketSchema = createInsertSchema(tickets, {
  id: z.union([z.number(), z.literal("(New)")]),
  title: (schema) =>
    schema.refine((val) => val.length > 0, { message: "Title is required" }),
  description: (schema) =>
    schema.refine((val) => val.length > 0, {
      message: "Description is required",
    }),
  tech: (schema) =>
    schema.refine((val) => z.string().email().safeParse(val).success, {
      message: "Invalid email address",
    }),
});

export const selectTicketSchema = createSelectSchema(tickets);

export type insertTicketSchemaType = typeof insertTicketSchema._type;

export type selectTicketSchemaType = typeof selectTicketSchema._type;
