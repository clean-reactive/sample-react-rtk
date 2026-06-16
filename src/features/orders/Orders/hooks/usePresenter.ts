import type { Presenter } from "../Orders.types";
import { useIsOrdersMutatingSelector, useOrderIdsSelector } from "../../hooks";
import { useGetOrdersQuery } from "../../repositories";

export const usePresenter = (): Presenter => {
  const { isLoading } = useGetOrdersQuery();
  const isMutating = useIsOrdersMutatingSelector();
  const orderIds = useOrderIdsSelector();

  const isProcessing = isLoading || isMutating;

  let statusLabel = "idle";
  if (isLoading) {
    statusLabel = "loading";
  } else if (isMutating) {
    statusLabel = "mutating";
  }

  return {
    isLoading,
    isMutating,
    isProcessing,
    statusLabel,
    orderIds,
  };
};
