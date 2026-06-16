import type { ItemEntity, ItemEntityId, OrderEntityId } from "../repositories";
import { useOrdersSelector } from "./useOrdersSelector";

export const useItemByIdSelector = (
  orderId: OrderEntityId,
  itemId: ItemEntityId,
): ItemEntity | undefined => {
  const data = useOrdersSelector();

  const order = data.find((orderEntity) => orderEntity.id === orderId);

  if (!order) {
    return;
  }
  return order.itemEntities.find((itemEntity) => itemEntity.id === itemId);
};
