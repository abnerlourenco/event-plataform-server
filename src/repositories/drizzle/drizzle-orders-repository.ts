import { and, eq, inArray } from 'drizzle-orm'
import { db } from '../../drizzle/client.ts'
import { orders } from '../../drizzle/schema/orders.ts'
import { seats } from '../../drizzle/schema/seats.ts'
import type {
  CreateOrderData,
  Order,
  OrderStatus,
  OrdersRepository,
} from '../orders-repository.ts'

export class DrizzleOrdersRepository implements OrdersRepository {
  async findById(id: string): Promise<Order | null> {
    const [order] = await db
      .select()
      .from(orders)
      .where(eq(orders.id, id))
      .limit(1)

    return order ?? null
  }

  async findByUser(userId: string): Promise<Order[] | null> {
    const userOrders = await db
      .select()
      .from(orders)
      .where(eq(orders.userId, userId))

    return userOrders
  }

  async create(data: CreateOrderData): Promise<Order> {
    return await db.transaction(async transaction => {
      const [order] = await transaction
        .insert(orders)
        .values({
          userId: data.userId,
          totalAmount: data.totalAmount,
          eventId: data.eventId,
        })
        .returning()

      await transaction
        .update(seats)
        .set({ status: 'RESERVED', orderId: order.id })
        .where(
          and(
            eq(seats.eventId, data.eventId),
            eq(seats.status, 'AVAILABLE'),
            inArray(seats.id, data.seatIds)
          )
        )
        .returning({ id: seats.id })

      return order
    })
  }

  async updateStatusById(id: string, status: OrderStatus): Promise<void> {
    await db.update(orders).set({ status }).where(eq(orders.id, id))
  }
}
