import type { OrderEntityId, ItemEntityId } from "./ordersRepository.types";

export const ordersTag = "Orders" as const;

export const getOrdersEndpointName = "getOrders" as const;
export const deleteOrderCacheKey = "deleteOrder" as const;
export const deleteOrderItemCacheKey = "deleteOrderItem" as const;

export const makeOrderEntityId = (id: string): OrderEntityId => id as OrderEntityId;
export const makeItemEntityId = (id: string): ItemEntityId => id as ItemEntityId;

export const makeDeleteOrderFixedCacheKey = (orderId: OrderEntityId): string =>
  `${deleteOrderCacheKey}:${orderId}`;

export const makeDeleteOrderItemFixedCacheKey = (
  orderId: OrderEntityId,
  itemId: ItemEntityId,
): string => `${deleteOrderItemCacheKey}:${orderId}:${itemId}`;
