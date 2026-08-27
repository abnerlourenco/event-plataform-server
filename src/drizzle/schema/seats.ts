import { pgEnum, pgTable, text, uuid } from 'drizzle-orm/pg-core'
import { events } from './events.ts'
import { orders } from './orders.ts'

export const seatStatus = pgEnum('seat_status', [
  'AVAILABLE',
  'RESERVED',
  'SOLD',
])

export const seats = pgTable('seats', {
  id: uuid('id').primaryKey().defaultRandom(),
  eventId: uuid('event_id')
    .references(() => events.id, { onDelete: 'cascade' })
    .notNull(),
  orderId: uuid('order_id').references(() => orders.id, {
    onDelete: 'set null',
  }),
  status: seatStatus('status').notNull().default('AVAILABLE'),
  seatNumber: text('seat_number').notNull(),
})
