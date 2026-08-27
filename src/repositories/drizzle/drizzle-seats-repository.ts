import { and, eq } from 'drizzle-orm'
import { db } from '../../drizzle/client.ts'
import { seats } from '../../drizzle/schema/seats.ts'
import type {
  CreateSeatData,
  Seat,
  SeatStatus,
  SeatsRepository,
} from '../seats-repository.ts'

export class DrizzleSeatsRepository implements SeatsRepository {
  async findById(id: string): Promise<Seat | null> {
    const [seat] = await db
      .select()
      .from(seats)
      .where(eq(seats.id, id))
      .limit(1)

    return seat ?? null
  }

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

  async findByOrderId(orderId: string): Promise<Seat[] | null> {
    const orderSeats = await db
      .select()
      .from(seats)
      .where(eq(seats.orderId, orderId))

    return orderSeats
  }

  async updateStatusById(id: string, status: SeatStatus): Promise<void> {
    await db.update(seats).set({ status }).where(eq(seats.id, id))
  }

  async updateIdByIdAndEventId(
    id: string,
    eventId: string,
    orderId: string
  ): Promise<void> {
    await db
      .update(seats)
      .set({ orderId })
      .where(and(eq(seats.id, id), eq(seats.eventId, eventId)))
  }

  async updateStatusByOrderId(
    orderId: string,
    status: SeatStatus
  ): Promise<void> {
    await db.update(seats).set({ status }).where(eq(seats.orderId, orderId))
  }
}
