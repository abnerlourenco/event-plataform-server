import { eq } from 'drizzle-orm'
import { db } from '../../drizzle/client.ts'
import { users } from '../../drizzle/schema/users.ts'
import type {
  CreateUserData,
  User,
  UsersRepository,
} from '../users-repository.ts'

export class DrizzleUsersRepository implements UsersRepository {
  async findByEmail(email: string): Promise<User | null> {
    const [user] = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        password: users.passwordHash,
      })
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    return user ?? null
  }

  async create(data: CreateUserData): Promise<void> {
    await db.insert(users).values(data).returning({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
    })
  }
}
