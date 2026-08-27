import type { Request, Response } from 'express'
import { makeListEventsUseCase } from '../../../use-cases/factories/make-list-events-use-case.ts'

export async function listEvents(_request: Request, response: Response) {
  const listEventsUseCase = makeListEventsUseCase()
  const events = await listEventsUseCase.execute()

  return response.status(200).json(events)
}
