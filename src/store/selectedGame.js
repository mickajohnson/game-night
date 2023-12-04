import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedGame: null,
};

export const selectedGameSlice = createSlice({
  name: "selectedGame",
  initialState,
  reducers: {
    setSelectedGame: (state, action) => {
      state.selectedGame = action.payload;
    },
  },
});

export const { setSelectedGame } = selectedGameSlice.actions;

export default selectedGameSlice.reducer;
