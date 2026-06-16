import { useCallback } from "react";
import type { Controller } from "../Order.types";
import type { OrderEntityId } from "../../../repositories";
import { useDeleteOrderUseCase } from "../../../hooks";

export const useController = (params: { orderId: OrderEntityId }): Controller => {
  const { execute: executeDeleteOrderUseCase } = useDeleteOrderUseCase(params);

  const deleteOrderButtonClicked = useCallback(() => {
    executeDeleteOrderUseCase();
  }, [executeDeleteOrderUseCase]);

  return { deleteOrderButtonClicked };
};
