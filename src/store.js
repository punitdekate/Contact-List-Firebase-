import { configureStore } from "@reduxjs/toolkit";
import { contactReducer } from "./redux/reducers/contacts.reducer";
import { loaderReducer } from "./redux/reducers/loader.reducer";
const store = configureStore({
  reducer: {
    contactReducer,
    loaderReducer,
  },
});

export default store;
