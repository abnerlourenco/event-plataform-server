import { eq } from 'drizzle-orm'
import { db } from '../../drizzle/client.ts'
import { orders } from '../../drizzle/schema/orders.ts'
import type {
  CreateOrderData,
  Order,
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

  async create(data: CreateOrderData): Promise<void> {
    await db.insert(orders).values(data)
  }
}
