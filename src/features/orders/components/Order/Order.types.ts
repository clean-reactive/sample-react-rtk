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

/**
 * A discriminated union on `hasOrder` lets TypeScript narrow away the optional
 * fields after a truthiness check. A flat interface with optional props also
 * works but loses that compile-time guarantee:
 *
 * ```ts
 * export interface Presenter {
 *   hasOrder: boolean;
 *   orderId?: string;
 *   userId?: string;
 *   itemIds?: ItemEntityId[];
 *   summaryLabel?: string;
 *   isDeleteOrderButtonDisabled?: boolean;
 * }
 * ```
 */

export interface Controller {
  deleteOrderButtonClicked: () => void;
}
