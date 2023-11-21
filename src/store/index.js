import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filters";
import userReducer from "./user";

export const store = configureStore({
  reducer: {
    filters: filterReducer,
    user: userReducer,
  },
});
