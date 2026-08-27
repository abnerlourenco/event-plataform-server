import { createHmac, randomInt } from 'node:crypto'
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
