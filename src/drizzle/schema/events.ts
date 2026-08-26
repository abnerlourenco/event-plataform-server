import {
  boolean,
  integer,
  pgTable,
  real,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'
import { users } from './users.ts'

export const events = pgTable('events', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizerId: uuid('organizer_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  title: text('title').notNull(),
  description: text('description'),
  dateTime: timestamp('date_time', { withTimezone: true }).notNull(),
  location: text('location').notNull(),
  bannerUrl: text('banner_url'),
  capacity: integer('capacity').notNull(),
  price: real('price').notNull(),
  eventProvider: text('event_provider'),
  externalId: text('external_id'),
  hasSeats: boolean('has_seats').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})
