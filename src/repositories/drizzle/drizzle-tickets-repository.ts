import { eq } from 'drizzle-orm'
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

  async create(data: CreateTicketData): Promise<void> {
    await db.insert(tickets).values(data)
  }

  async updateStatusbyId(id: string, status: TicketStatus): Promise<void> {
    await db.update(tickets).set({ status }).where(eq(tickets.id, id))
  }
}
