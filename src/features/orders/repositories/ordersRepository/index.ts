export {
  ordersRepository,
  useGetOrdersQuery,
  useDeleteOrderMutation,
  useDeleteOrderItemMutation,
} from "./ordersRepository";
export {
  ordersTag,
  getOrdersEndpointName,
  deleteOrderCacheKey,
  deleteOrderItemCacheKey,
  makeDeleteOrderFixedCacheKey,
  makeDeleteOrderItemFixedCacheKey,
  makeOrderEntityId,
  makeItemEntityId,
} from "./ordersRepository.utils";
export type {
  ItemEntity,
  ItemEntityId,
  OrderEntity,
  OrderEntityId,
} from "./ordersRepository.types";
