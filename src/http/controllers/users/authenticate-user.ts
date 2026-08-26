import type { Request, Response } from 'express'
import z from 'zod'
import { makeAuthenticateUserUseCase } from './../../../use-cases/factories/make-authenticate-user-use-case.ts'

const authenticateUserBodySchema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z.string().min(8).max(72),
})

export async function authenticateUser(request: Request, response: Response) {
  const { email, password } = authenticateUserBodySchema.parse(request.body)

  const authenticateUserUseCase = makeAuthenticateUserUseCase()

  const user = await authenticateUserUseCase.execute({ email, password })

  return response.status(200).json(user)
}
