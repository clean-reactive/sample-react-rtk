import { useCallback } from "react";
import type { Controller } from "../../OrderItem.types";
import {
  useDeleteOrderItemMutation,
  useDeleteOrderMutation,
  makeDeleteOrderItemFixedCacheKey,
  makeDeleteOrderFixedCacheKey,
  type ItemEntityId,
  type OrderEntityId,
} from "../../../../repositories";
import { useOrderByIdSelector } from "../../../../hooks";

export const useController = (params: {
  orderId: OrderEntityId;
  itemId: ItemEntityId;
}): Controller => {
  const order = useOrderByIdSelector(params.orderId);
  const isLastItem = (order?.itemEntities.length ?? 0) === 1;

  const [deleteOrderItem] = useDeleteOrderItemMutation({
    fixedCacheKey: makeDeleteOrderItemFixedCacheKey(params.orderId, params.itemId),
  });
  const [deleteOrder] = useDeleteOrderMutation({
    fixedCacheKey: makeDeleteOrderFixedCacheKey(params.orderId),
  });

  const deleteOrderItemButtonClicked = useCallback(async () => {
    try {
      if (isLastItem) {
        await deleteOrder({ orderId: params.orderId }).unwrap();
      } else {
        await deleteOrderItem(params).unwrap();
      }
    } catch (error: unknown) {
      console.error(error);
    }
  }, [deleteOrder, deleteOrderItem, isLastItem, params]);

  return {
    deleteOrderItemButtonClicked,
  };
};
