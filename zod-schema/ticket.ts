// This code defines validation schemas for inserting and selecting ticket data using Drizzle ORM with Zod.
// It ensures that ticket data is valid before interacting with the database.
// Let's break it down step by step.

import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { tickets } from "@/db/schema";
import { z } from "zod";

//////////////////////////////////////////////////////////////////////////////////////
// createInsertSchema(tickets, {...}):
// Generates a schema for inserting ticket data based on the tickets table structure.
// The second argument applies custom validation rules.

export const insertTicketSchema = createInsertSchema(tickets, {
  id: z.union([z.number(), z.literal("(New)")]),

  title: (schema) =>
    schema.refine((val) => val.length > 0, { message: "Un titre est requis" }),

  description: (schema) =>
    schema.refine((val) => val.length > 0, {
      message: "Une description est requise",
    }),
  tech: (schema) =>
    schema.refine((val) => z.string().email().safeParse(val).success, {
      message: "Adresse email non valide",
    }),
});

export const selectTicketSchema = createSelectSchema(tickets);

// typeof insertTicketSchema._type:
// Extracts the TypeScript type from the Zod schema.
// Ensures type safety when working with ticket data in your app.
export type insertTicketSchemaType = typeof insertTicketSchema._type;
export type selectTicketSchemaType = typeof selectTicketSchema._type;
