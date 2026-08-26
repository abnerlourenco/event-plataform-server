import { DrizzleUsersRepository } from '../../repositories/drizzle/drizzle-users-repository.ts'
import { AuthenticateUserUseCase } from '../users/authenticate-user.ts'

export function makeAuthenticateUserUseCase() {
  const usersRepository = new DrizzleUsersRepository()

  return new AuthenticateUserUseCase(usersRepository)
}
