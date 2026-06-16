import { useAppSelector } from "../../../hooks";
import type { OrdersResource } from "../stores";

export const useOrdersResourceSelector = (): OrdersResource =>
  useAppSelector((state) => state.ordersPresentation.ordersResource);
