import type { OrderEntityId } from "../../repositories";
import { useOrdersSelector } from "../useOrdersSelector";

export const useOrderIdsSelector = (): OrderEntityId[] => {
  const data = useOrdersSelector();

  return data.map((order) => order.id);
};
