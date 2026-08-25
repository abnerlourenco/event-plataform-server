import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const userRole = pgEnum('user_role', [
  'CLIENT',
  'ORGANIZER',
  'GATEKEEPER',
])

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text().notNull(),
  email: text().notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: userRole().notNull().default('CLIENT'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})
