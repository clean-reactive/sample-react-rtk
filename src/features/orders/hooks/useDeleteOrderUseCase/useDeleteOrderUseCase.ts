import { useCallback } from "react";
import { useDispatch } from "react-redux";
import type { UseCase } from "../../../../@types";
import {
  type OrderEntityId,
  useDeleteOrderMutation,
  makeDeleteOrderFixedCacheKey,
  ordersRepository,
  ordersTag,
} from "../../repositories";

export const useDeleteOrderUseCase = (params: { orderId: OrderEntityId }): UseCase => {
  const dispatch = useDispatch();
  const [deleteOrder] = useDeleteOrderMutation({
    fixedCacheKey: makeDeleteOrderFixedCacheKey(params.orderId),
  });

  const execute = useCallback(async () => {
    try {
      await deleteOrder({ orderId: params.orderId }).unwrap();
      dispatch(ordersRepository.util.invalidateTags([ordersTag]));
    } catch (error: unknown) {
      console.error(error);
    }
  }, [deleteOrder, dispatch, params.orderId]);

  return { execute };
};
