/* This is the users reducer. This one manages a slice of state, where we store an array with information about all users and their blogs. */

import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users";

const initialState = [];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    /* This one is used to set all users in state when initializing. */
    setUsers: (state, action) => {
      const usersArray = action.payload;
      return usersArray;
    },
  },
});

export const { setUsers } = usersSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    const response = await usersService.getAll();
    dispatch(setUsers(response));
  };
};

/* There are many different types of exports in this file. This is the default export. We also export an object with actions and a function. Actually the actions are exported as an object that is assigned to usersSlice.actions key. The object key is the action function name and the value is the action function itself. */
export default usersSlice.reducer;
