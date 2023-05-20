import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./features/basketSlices";
import storeReducer from "./features/storeSlices";
export const store = configureStore({
  reducer: {
    basket: basketReducer,
    store: storeReducer,
  },
});
