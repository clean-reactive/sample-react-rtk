import type { OrderEntityId, ItemEntityId } from "../../repositories";

export interface OrderItemProps {
  orderId: OrderEntityId;
  itemId: ItemEntityId;
}

interface PresenterWithItem {
  hasItem: true;
  itemId: ItemEntityId;
  productId: string;
  productQuantity: number;
  isDeleteItemButtonDisabled: boolean;
}
interface PresenterWithoutItem {
  hasItem: false;
}

export type Presenter = PresenterWithItem | PresenterWithoutItem;

/**
 * A discriminated union on `hasItem` lets TypeScript narrow away the optional
 * fields after a truthiness check. A flat interface with optional props also
 * works but loses that compile-time guarantee:
 *
 * ```ts
 * export interface Presenter {
 *   hasItem: boolean;
 *   itemId?: ItemEntityId;
 *   productId?: string;
 *   productQuantity?: number;
 *   isDeleteItemButtonDisabled?: boolean;
 * }
 * ```
 */

export interface Controller {
  deleteOrderItemButtonClicked: () => void;
}
