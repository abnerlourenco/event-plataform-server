import type { NextFunction, Request, Response } from 'express'
import { DrizzleUsersRepository } from '../../repositories/drizzle/drizzle-users-repository.ts'
import { AppError } from '../../use-cases/errors/app-error.ts'

export async function ensureOrganizer(
  request: Request,
  _response: Response,
  next: NextFunction
): Promise<void> {
  const usersRepository = new DrizzleUsersRepository()
  const user = await usersRepository.findById(request.user.id)

  if (user?.role !== 'ORGANIZER') {
    throw new AppError('Only organizers can access movies', 403)
  }

  next()
}
