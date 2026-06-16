import type { Presenter } from "../OrderItem.types";
import {
  type ItemEntityId,
  type OrderEntityId,
  useDeleteOrderItemMutation,
  makeDeleteOrderItemFixedCacheKey,
} from "../../../repositories";
import { useItemByIdSelector, useIsDeleteOrderMutatingSelector } from "../../../hooks";

export const usePresenter = (params: {
  orderId: OrderEntityId;
  itemId: ItemEntityId;
}): Presenter => {
  const item = useItemByIdSelector(params.orderId, params.itemId);
  const isDeleteOrderInProgress = useIsDeleteOrderMutatingSelector(params.orderId);
  const [, { isLoading: isDeleteItemInProgress }] = useDeleteOrderItemMutation({
    fixedCacheKey: makeDeleteOrderItemFixedCacheKey(params.orderId, params.itemId),
  });

  if (!item) {
    return {
      hasItem: false,
    };
  }
  return {
    hasItem: true,
    itemId: item.id,
    productId: item.productId,
    productQuantity: item.quantity,
    isDeleteItemButtonDisabled: isDeleteItemInProgress || isDeleteOrderInProgress,
  };
};
