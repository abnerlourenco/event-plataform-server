import { and, eq } from 'drizzle-orm'
import { db } from '../../drizzle/client.ts'
import { tickets } from '../../drizzle/schema/tickets.ts'
import type {
  CreateTicketData,
  Ticket,
  TicketStatus,
  TicketsRepository,
} from '../tickets-repository.ts'

export class DrizzleTicketsRepository implements TicketsRepository {
  async findById(id: string): Promise<Ticket | null> {
    const [ticket] = await db
      .select()
      .from(tickets)
      .where(eq(tickets.id, id))
      .limit(1)

    return ticket ?? null
  }

  async findByHashCode(hashCode: string): Promise<Ticket | null> {
    const [ticket] = await db
      .select()
      .from(tickets)
      .where(eq(tickets.hashCode, hashCode))
      .limit(1)

    return ticket ?? null
  }

  async create(data: CreateTicketData): Promise<Ticket> {
    const [ticket] = await db.insert(tickets).values(data).returning()

    return ticket
  }

  async findByOrderId(orderId: string): Promise<Ticket[] | null> {
    const orderTickets = await db
      .select()
      .from(tickets)
      .where(eq(tickets.orderId, orderId))

    return orderTickets
  }

  async updateStatusbyId(id: string, status: TicketStatus): Promise<void> {
    await db.update(tickets).set({ status }).where(eq(tickets.id, id))
  }

  async markAsUsed(
    id: string,
    validatedBy: string,
    validatedAt: Date
  ): Promise<boolean> {
    const updatedTickets = await db
      .update(tickets)
      .set({ status: 'USED', validatedBy, validatedAt })
      .where(and(eq(tickets.id, id), eq(tickets.status, 'VALID')))
      .returning({ id: tickets.id })

    return updatedTickets.length > 0
  }
}
