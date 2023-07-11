import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { foodApi } from "./services/foodApi";
import foodReducer from "./features/foodSlice";

export const store = configureStore({
  reducer: {
    foodReducer,
    [foodApi.reducerPath]: foodApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([foodApi.middleware]),
});

setupListeners(store.dispatch);

//RootState, AppDispatch타입을 선언합니다.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
