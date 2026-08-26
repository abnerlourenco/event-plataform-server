import { pgEnum, pgTable, real, timestamp, uuid } from 'drizzle-orm/pg-core'
import { events } from './events.ts'
import { users } from './users.ts'

export const orderStatus = pgEnum('order_status', [
  'PENDING',
  'APPROVED',
  'CANCELLED',
])

export const orders = pgTable('orders', {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  status: orderStatus('status').notNull().default('PENDING'),
  totalAmount: real('price').notNull(),
  eventId: uuid('event_id')
    .references(() => events.id, { onDelete: 'cascade' })
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})
