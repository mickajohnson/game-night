import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filters";

export const store = configureStore({
  reducer: {
    filters: filterReducer,
  },
});
