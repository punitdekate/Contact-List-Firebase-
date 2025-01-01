import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  isLoading: false,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState: INITIAL_STATE,
  reducers: {
    startLoader: (state, action) => {
      state.isLoading = true;
    },
    endLoader: (state, action) => {
      state.isLoading = false;
    },
  },
});

const loaderReducer = loaderSlice.reducer;
const { startLoader, endLoader } = loaderSlice.actions;
const loaderSelector = (state) => state.loaderReducer;
export { loaderReducer, loaderSelector, startLoader, endLoader };
