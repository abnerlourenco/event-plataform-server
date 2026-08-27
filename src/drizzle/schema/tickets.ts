import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { events } from './events.ts'
import { orders } from './orders.ts'
import { seats } from './seats.ts'
import { users } from './users.ts'

export const ticketStatus = pgEnum('ticket_status', [
  'VALID',
  'USED',
  'CANCELLED',
])

export const tickets = pgTable('tickets', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id').references(() => orders.id, {
    onDelete: 'cascade',
  }),
  eventId: uuid('event_id')
    .references(() => events.id, { onDelete: 'cascade' })
    .notNull(),
  hashCode: text('hash_code'),
  qrCodeUrl: text('qr_code_url'),
  status: ticketStatus('status').notNull().default('VALID'),
  seatId: uuid('seat_id')
    .references(() => seats.id)
    .unique()
    .notNull(),
  validatedAt: timestamp('validated_at', { withTimezone: true }),
  validatedBy: uuid('validated_by').references(() => users.id, {
    onDelete: 'no action',
  }),
})
