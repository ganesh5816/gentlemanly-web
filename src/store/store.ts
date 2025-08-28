import { configureStore } from "@reduxjs/toolkit";
import giftReducer from "./giftSlice";

export const store = configureStore({
  reducer: {
    gifts: giftReducer,
    // Add other reducers here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
