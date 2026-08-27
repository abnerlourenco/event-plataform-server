import { hashPassword } from '../utils/hash.ts'
import { db, pg } from './client.ts'
import { users } from './schema/users.ts'

type SeedUser = {
  name: string
  email: string
  role: 'CLIENT' | 'ORGANIZER' | 'GATEKEEPER'
}

const seedUsers: SeedUser[] = [
  {
    name: 'Seed Client',
    email: 'cliente1@example.com',
    role: 'CLIENT',
  },
  {
    name: 'Seed Organizer',
    email: 'organizador1@example.com',
    role: 'ORGANIZER',
  },
  {
    name: 'Seed Gatekeeper',
    email: 'porteiro1@example.com',
    role: 'GATEKEEPER',
  },
]

try {
  const passwordHash = await hashPassword('12345678')
  const insertedUsers = await db
    .insert(users)
    .values(
      seedUsers.map(user => ({
        ...user,
        passwordHash,
      }))
    )
    .onConflictDoNothing({ target: users.email })
    .returning({ email: users.email })

  console.log(`${insertedUsers.length} seed user(s) created.`)
} finally {
  await pg.end()
}
