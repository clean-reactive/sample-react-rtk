import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import type { FC, PropsWithChildren } from "react";
import { makeStore } from "../../../../store";

export const makeComponentFixture = () => {
  const store = makeStore();

  const Fixture: FC<PropsWithChildren<unknown>> = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  return {
    user: userEvent.setup(),
    Fixture,
  };
};
