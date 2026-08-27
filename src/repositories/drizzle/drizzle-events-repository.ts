import { eq } from 'drizzle-orm'
import { db } from '../../drizzle/client.ts'
import { events } from '../../drizzle/schema/events.ts'
import type {
  CreateEventData,
  Event,
  EventsRepository,
} from '../events-repository.ts'

export class DrizzleEventsRepository implements EventsRepository {
  async findById(id: string): Promise<Event | null> {
    const [event] = await db
      .select()
      .from(events)
      .where(eq(events.id, id))
      .limit(1)

    return event ?? null
  }

  async findByOrganizerId(organizerId: string): Promise<Event[] | null> {
    const organizerEvents = await db
      .select()
      .from(events)
      .where(eq(events.organizerId, organizerId))

    return organizerEvents
  }

  async findAll(): Promise<Event[] | null> {
    return db.select().from(events)
  }

  async create(data: CreateEventData): Promise<Event> {
    const [event] = await db.insert(events).values(data).returning()

    return event
  }
}
