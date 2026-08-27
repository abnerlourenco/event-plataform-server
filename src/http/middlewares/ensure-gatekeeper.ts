import type { NextFunction, Request, Response } from 'express'
import { DrizzleUsersRepository } from '../../repositories/drizzle/drizzle-users-repository.ts'
import { AppError } from '../../use-cases/errors/app-error.ts'

export async function ensureGatekeeper(
  request: Request,
  _response: Response,
  next: NextFunction
): Promise<void> {
  const usersRepository = new DrizzleUsersRepository()
  const user = await usersRepository.findById(request.user.id)

  if (user?.role !== 'GATEKEEPER') {
    throw new AppError('User has not permission', 403)
  }

  next()
}
