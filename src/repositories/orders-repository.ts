export type OrderStatus = 'PENDING' | 'APPROVED' | 'CANCELLED'

export interface Order {
  id: string
  userId: string
  status: OrderStatus
  totalAmount: number
  eventId: string
}

export interface CreateOrderData {
  userId: string
  totalAmount: number
  eventId: string
}

export interface OrdersRepository {
  findById(id: string): Promise<Order | null>
  findByUser(userId: string): Promise<Order[] | null>
  create(data: CreateOrderData): Promise<Order>
  updateStatusById(id: string, status: OrderStatus): Promise<void>
}
