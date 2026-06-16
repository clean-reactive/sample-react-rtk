import type { ItemEntityId, OrderEntityId } from "../../repositories";

export interface OrderParams {
  orderId: OrderEntityId;
}

interface PresenterWithoutOrder {
  hasOrder: false;
}

interface PresenterWithOrder {
  hasOrder: true;
  orderId: string;
  userId: string;
  itemIds: ItemEntityId[];
  summaryLabel: string;
  isDeleteOrderButtonDisabled: boolean;
}

export type Presenter = PresenterWithoutOrder | PresenterWithOrder;

export interface Controller {
  deleteOrderButtonClicked: () => void;
}
