import { createHmac, randomInt, timingSafeEqual } from 'node:crypto'
import { env } from '../env.ts'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

export function generateTicketHash(): string {
  return Array.from(
    { length: 8 },
    () => alphabet[randomInt(alphabet.length)]
  ).join('')
}

export function signTicket(
  hashCode: string,
  orderId: string,
  eventId: string,
  seatId: string
): string {
  return createHmac('sha256', env.JWT_SECRET_TOKEN)
    .update(`${hashCode}:${orderId}:${eventId}:${seatId}`)
    .digest('hex')
}

export function isValidTicketSignature(
  signature: string,
  hashCode: string,
  orderId: string,
  eventId: string,
  seatId: string
): boolean {
  const expectedSignature = signTicket(hashCode, orderId, eventId, seatId)
  const provided = Buffer.from(signature, 'hex')
  const expected = Buffer.from(expectedSignature, 'hex')

  return (
    provided.length === expected.length && timingSafeEqual(provided, expected)
  )
}
