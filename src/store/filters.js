import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => ({
  weights: [],
  bestAtCount: "",
  searchValue: "",
});

export const filtersSlice = createSlice({
  name: "filters",
  initialState: getInitialState(),
  reducers: {
    setFilter: (state, action) => {
      state[action.payload.filterName] = action.payload.filterValue;
    },
    clearFilters: () => {
      return getInitialState();
    },
  },
});

export const { setFilter, clearFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
