import type {
  User,
  UsersRepository,
} from '../../repositories/users-repository.ts'
import { hashPassword } from '../../utils/hash.ts'
import { AppError } from '../errors/app-error.ts'

interface CreateUserRequest {
  name: string
  email: string
  password: string
}

export class CreateUserUseCase {
  private readonly usersRepository: UsersRepository

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ name, email, password }: CreateUserRequest): Promise<User> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new AppError('User already exists', 409)
    }

    const passwordHash = await hashPassword(password)

    return this.usersRepository.create({ name, email, passwordHash })
  }
}
