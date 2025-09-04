// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import giftReducer from "./giftSlice";

// Create the store
export const store = configureStore({
  reducer: {
    gifts: giftReducer,
    // Add other reducers here as needed
  },
  // Optional: Add middleware for development
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serializable check
        ignoredActions: [],
        // Ignore these field paths in all actions
        ignoredActionsPaths: [],
        // Ignore these paths in the state
        ignoredPaths: [],
      },
    }),
});

// Export types for TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Optional: Create typed hooks for use throughout your app
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Export selectors for easier state access
export const selectEventGifts = (state: RootState) => state.gifts.eventGifts;
export const selectSelectedEvent = (state: RootState) =>
  state.gifts.selectedEvent;
export const selectSelectedGifts = (state: RootState) =>
  state.gifts.selectedGifts;
export const selectGiftsByEvent = (eventKey: string) => (state: RootState) =>
  state.gifts.eventGifts[eventKey] || [];

// Helper function to get all gifts count
export const selectTotalGiftsCount = (state: RootState) => {
  return Object.values(state.gifts.eventGifts).reduce(
    (total, gifts) => total + gifts.length,
    0
  );
};

// Helper function to get selected gifts total price
export const selectSelectedGiftsTotalPrice = (state: RootState) => {
  return state.gifts.selectedGifts.reduce((total, gift) => {
    const priceNumber = parseFloat(gift.price.replace(/[$,]/g, ""));
    return total + priceNumber;
  }, 0);
};
