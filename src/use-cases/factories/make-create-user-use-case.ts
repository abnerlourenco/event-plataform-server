import { DrizzleUsersRepository } from '../../repositories/drizzle/drizzle-users-repository.ts'
import { CreateUserUseCase } from '../users/create-user.ts'

export function makeCreateUserUseCase() {
  const usersRepository = new DrizzleUsersRepository()

  return new CreateUserUseCase(usersRepository)
}
