import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
  },
});

console.log(store);
console.log(store.liftedStore);
console.log(store.getState());

export default store;
