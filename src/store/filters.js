import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  weights: [],
  bestAtCount: "",
  searchValue: "",
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state[action.payload.filterName] = action.payload.filterValue;
    },
    clearFilters: (state) => {
      state = initialState;
    },
  },
});

export const { setFilter, clearFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
