export type OrdersResource = "local" | "remote";

export interface OrdersPresentationEntity {
  ordersResource: OrdersResource;
}
