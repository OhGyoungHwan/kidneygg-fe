import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { foodApi } from "./services/foodApi";
import dietReducer from "./features/dietSlice";
import dishReducer from "./features/dishSlice";
import foodReducer from "./features/foodSlice";
import { dietApi } from "./services/dietApi";
import { dishApi } from "./services/dishApi";

export const store = configureStore({
  reducer: {
    dishReducer,
    dietReducer,
    foodReducer,
    [foodApi.reducerPath]: foodApi.reducer,
    [dietApi.reducerPath]: dietApi.reducer,
    [dishApi.reducerPath]: dishApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      foodApi.middleware,
      dietApi.middleware,
      dishApi.middleware,
    ]),
});

setupListeners(store.dispatch);

//RootState, AppDispatch타입을 선언합니다.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
