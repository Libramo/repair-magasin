import { db } from "@/db";
import { customers } from "@/db/schema";
import { tickets } from "@/db/schema";
import { asc, eq, ilike, or, sql } from "drizzle-orm";

export const getCustomer = async (id: number) => {
  const customer = await db
    .select()
    .from(customers)
    .where(eq(customers.id, id));

  return customer[0];
};

export const getTicket = async (id: number) => {
  const ticket = await db.select().from(tickets).where(eq(tickets.id, id));

  return ticket[0];
};

export async function getAllCustomers() {
  const results = await db.select().from(customers).orderBy(customers.lastName);
  return results;
}

export async function getCustomerSearchResults(searchText: string) {
  const results = await db
    .select()
    .from(customers)
    .where(
      or(
        ilike(customers.email, `%${searchText}%`),
        ilike(customers.phone, `%${searchText}%`),
        ilike(customers.region, `%${searchText}%`),
        // ilike(customers.city, `%${searchText}%`),
        // ilike(customers.zip, `%${searchText}%`),
        sql`lower(concat(${customers.firstName}, ' ', ${
          customers.lastName
        })) LIKE ${`%${searchText.toLowerCase().replace(" ", "%")}%`}`
      )
    )
    .orderBy(customers.lastName);
  return results;
}

export async function getTicketSearchResults(searchText: string) {
  const results = await db
    .select({
      id: tickets.id,
      ticketDate: tickets.createdAt,
      title: tickets.title,
      firstName: customers.firstName,
      lastName: customers.lastName,
      email: customers.email,
      tech: tickets.tech,
      completed: tickets.completed,
    })
    .from(tickets)
    .leftJoin(customers, eq(tickets.customerId, customers.id))
    .where(
      or(
        ilike(tickets.title, `%${searchText}%`),
        ilike(tickets.tech, `%${searchText}%`),
        ilike(customers.email, `%${searchText}%`),
        ilike(customers.phone, `%${searchText}%`),
        // ilike(customers.city, `%${searchText}%`),
        // ilike(customers.zip, `%${searchText}%`),
        sql`lower(concat(${customers.firstName}, ' ', ${
          customers.lastName
        })) LIKE ${`%${searchText.toLowerCase().replace(" ", "%")}%`}`
      )
    )
    .orderBy(asc(tickets.createdAt));

  return results;
}

export async function getOpenTickets() {
  const results = await db
    .select({
      id: tickets.id,
      ticketDate: tickets.createdAt,
      title: tickets.title,
      firstName: customers.firstName,
      lastName: customers.lastName,
      email: customers.email,
      tech: tickets.tech,
      completed: tickets.completed,
    })
    .from(tickets)
    .leftJoin(customers, eq(tickets.customerId, customers.id))
    .where(eq(tickets.completed, false))
    .orderBy(asc(tickets.createdAt));

  return results;
}

export type TicketSearchResultsType = Awaited<
  ReturnType<typeof getTicketSearchResults>
>;
