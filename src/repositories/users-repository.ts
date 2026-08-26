export type UserRole = 'CLIENT' | 'ORGANIZER' | 'GATEKEEPER'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  password: string
}

export interface CreateUserData {
  name: string
  email: string
  passwordHash: string
}

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  create(data: CreateUserData): Promise<void>
}
