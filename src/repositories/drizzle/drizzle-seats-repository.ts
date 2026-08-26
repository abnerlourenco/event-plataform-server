import { eq } from 'drizzle-orm'
import { db } from '../../drizzle/client.ts'
import { seats } from '../../drizzle/schema/seats.ts'
import type {
  CreateSeatData,
  Seat,
  SeatsRepository,
} from '../seats-repository.ts'

export class DrizzleSeatsRepository implements SeatsRepository {
  async create(data: CreateSeatData): Promise<void> {
    await db.insert(seats).values({
      eventId: data.eventId,
      seatNumber: data.seatnumber,
    })
  }

  async findByEventId(eventId: string): Promise<Seat[] | null> {
    const eventSeats = await db
      .select()
      .from(seats)
      .where(eq(seats.eventId, eventId))

    return eventSeats
  }
}
