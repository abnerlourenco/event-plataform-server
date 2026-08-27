import type { Request, Response } from 'express'
import { z } from 'zod'
import { makeCreateEventUseCase } from '../../../use-cases/factories/make-create-event-use-case.ts'

const createEventBodySchema = z.object({
  title: z.string().trim().min(2).max(120),
  description: z
    .union([z.string().trim().min(1).max(500), z.null()])
    .optional(),
  dateTime: z.coerce.date(),
  location: z.string().trim().min(2).max(200),
  bannerUrl: z.union([z.string().trim().min(1).max(500), z.null()]).optional(),
  capacity: z.coerce.number().int().positive().optional(),
  price: z.coerce.number().nonnegative(),
  eventProvider: z.union([z.string().trim().min(1).max(50), z.null()]),
  externalId: z.union([z.string().trim().min(1).max(100), z.null()]),
})

export async function createEvent(request: Request, response: Response) {
  const {
    title,
    description,
    dateTime,
    location,
    bannerUrl,
    capacity,
    price,
    eventProvider,
    externalId,
  } = createEventBodySchema.parse(request.body)

  const createEventUseCase = makeCreateEventUseCase()

  await createEventUseCase.execute({
    organizerId: request.user.id,
    title,
    description,
    dateTime,
    location,
    bannerUrl,
    capacity,
    price,
    eventProvider,
    externalId,
  })

  return response.status(201).send()
}
