import { useCallback, type FC } from "react";
import { useAppDispatch } from "../../../hooks";
import { setOrdersResource } from "../stores";
import { isOrdersResource } from "../utils";
import { useOrdersResourceSelector } from "../hooks";
import { ordersRepository } from "../repositories";

export const OrdersResourcePicker: FC = () => {
  const resource = useOrdersResourceSelector();
  const dispatch = useAppDispatch();
  const radioInputChanged = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (!isOrdersResource(value)) {
        return;
      }
      dispatch(setOrdersResource(value));
      dispatch(ordersRepository.util.resetApiState());
    },
    [dispatch],
  );

  return (
    <div className="join">
      <input
        className="join-item btn btn-sm"
        type="radio"
        name="orders-resource"
        aria-label="Local"
        value="local"
        checked={resource === "local"}
        onChange={radioInputChanged}
      />
      <input
        className="join-item btn btn-sm"
        type="radio"
        name="orders-resource"
        aria-label="Remote"
        value="remote"
        checked={resource === "remote"}
        onChange={radioInputChanged}
      />
    </div>
  );
};
