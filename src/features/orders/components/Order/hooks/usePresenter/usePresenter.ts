import type { Presenter } from "../../Order.types";
import type { ItemEntity, OrderEntityId } from "../../../../repositories";
import { useOrdersSelector, useIsDeleteOrderMutatingSelector } from "../../../../hooks";

const ITEMS_FALLBACK: ItemEntity[] = [];

export const usePresenter = (params: { orderId: OrderEntityId }): Presenter => {
  const orders = useOrdersSelector();
  const isDeleteOrderInProgress = useIsDeleteOrderMutatingSelector(params.orderId);

  const order = orders.find((o) => o.id === params.orderId);
  const items = order?.itemEntities ?? ITEMS_FALLBACK;

  if (!order) {
    return {
      hasOrder: false,
    };
  }

  const itemIds = items.map((itemEntity) => itemEntity.id);

  return {
    hasOrder: true,
    userId: order.userId,
    orderId: order.id,
    itemIds,
    summaryLabel: `${itemIds.length} item${itemIds.length !== 1 ? "s" : ""}`,
    isDeleteOrderButtonDisabled: isDeleteOrderInProgress,
  };
};
