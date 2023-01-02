import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";

/* This is where we configure the store with configureStore, which is a redux toolkit function.  */
const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blog: blogReducer,
  },
});

console.log(store.getState());

export default store;
