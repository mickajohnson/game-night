import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filters";
import userReducer from "./user";
import selectedGameReducer from "./selectedGame";

export const store = configureStore({
  reducer: {
    filters: filterReducer,
    user: userReducer,
    selectedGame: selectedGameReducer,
  },
});
