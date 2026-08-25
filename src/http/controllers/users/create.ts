import type { Request, Response } from 'express'
import { z } from 'zod'
import { makeCreateUserUseCase } from '../../../use-cases/factories/make-create-user-use-case.ts'

const createUserBodySchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().trim().toLowerCase(),
  password: z.string().min(8).max(72),
})

export async function createUser(request: Request, response: Response) {
  const { name, email, password } = createUserBodySchema.parse(request.body)

  const createUserUseCase = makeCreateUserUseCase()

  await createUserUseCase.execute({ name, email, password })

  return response.status(201).send()
}
