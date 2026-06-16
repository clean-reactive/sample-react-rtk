import { useCallback } from "react";
import type { Controller } from "../Orders.types";
import { noop } from "../../../../utils";

export const useController = (): Controller => {
  const moduleDestroyed = useCallback(() => {
    noop();
  }, []);

  return {
    moduleDestroyed,
  };
};
