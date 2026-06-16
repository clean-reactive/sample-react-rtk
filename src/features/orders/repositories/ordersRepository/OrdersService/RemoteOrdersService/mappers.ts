import type { ApiOrderDto, ApiOrderItemDto } from "../../../../api";
import type {
  OrderEntity,
  ItemEntity,
  OrderEntityId,
  ItemEntityId,
} from "../../ordersRepository.types";

export function toOrderEntity(dto: ApiOrderDto): OrderEntity {
  return {
    id: dto.id as OrderEntityId,
    userId: dto.userId,
    itemEntities: dto.items.map(toItemEntity),
  };
}

export function toItemEntity(dto: ApiOrderItemDto): ItemEntity {
  return {
    id: dto.id as ItemEntityId,
    productId: dto.productId,
    quantity: dto.quantity,
  };
}
