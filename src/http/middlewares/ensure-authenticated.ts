import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../../env.ts'
import { AppError } from '../../use-cases/errors/app-error.ts'

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(
  request: Request,
  _response: Response,
  next: NextFunction
): Promise<void> {
  const tokenHeader = request.headers.authorization

  if (!tokenHeader) {
    throw new AppError('token missing', 401)
  }

  const [, token] = tokenHeader.split(' ')

  try {
    const { sub: user_id } = jwt.verify(token, env.JWT_SECRET_TOKEN) as IPayload

    request.user = {
      id: user_id,
    }

    next()
  } catch (error) {
    throw new AppError('Invalid token!', 401)
  }
}
