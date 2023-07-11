"use client";
//13버젼이후 AppRouter방식이 디폴트가 되었고 AppRouter방식에 맞추기 위해서 자식에 래핑하는 Provider을 만든다.
import { store } from "./store";
import { Provider } from "react-redux";

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
