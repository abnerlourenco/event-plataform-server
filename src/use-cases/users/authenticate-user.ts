import jwt from 'jsonwebtoken'
import { env } from '../../env.ts'
import type {
  UserRole,
  UsersRepository,
} from '../../repositories/users-repository.ts'
import { comparePassword } from './../../utils/hash.ts'
import { AppError } from '../errors/app-error.ts'

interface AuthenticateUserRequest {
  email: string
  password: string
}

interface AuthenticateUserResponse {
  user: {
    name: string
    email: string
    role: UserRole
  }
  token: string
}

export class AuthenticateUserUseCase {
  private readonly usersRepository: UsersRepository

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({
    email,
    password,
  }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Email or password incorrect!', 401)
    }

    const passwordCompare = await comparePassword(password, user.password)

    if (!passwordCompare) {
      throw new AppError('Email or password incorrect!', 401)
    }

    const token = jwt.sign({}, env.JWT_SECRET_TOKEN, {
      subject: user.id,
      expiresIn: '1d',
    })

    const authReturn: AuthenticateUserResponse = {
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    }

    return authReturn
  }
}
