/* Lots of notes etc to read in blogReducer.js. This one will hopefully have less, who knows. */

import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import { setNotification } from "../reducers/notificationReducer";
import { removeBlogsFromState } from "./blogReducer";

const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const userObject = action.payload;
      return userObject;
    },
    logout: (state, action) => {
      return null;
    },
  },
});

/* Export action types. */
export const { login, logout } = userSlice.actions;

/* Thunk function to login user. Inlcudes dispatch to set a notification. What the hell is the correct place to do this. If I do it here I get some kind of error handling. */
export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      dispatch(login(user));
      dispatch(setNotification("Logged in!", 5, "success"));
    } catch (error) {
      console.log(error);
      dispatch(setNotification("Error", 5, "danger"));
    }
  };
};

/* Function to log in user from local storgare. This one is needed to keep the user logged between restarts. The userObject includes username, password, and token. No need for thunk here, this is a synchronous function. Super simple. */
export const setLoggedUserInState = (userObject) => {
  return (dispatch) => dispatch(login(userObject));
};

/* Function to logou user. No need for async. */
export const logoutUser = () => {
  return (dispatch) => {
    /* Remove user from local storage. */
    window.localStorage.removeItem("loggedBlogappUser");
    /* Remove blogs from state (store). */
    dispatch(removeBlogsFromState());
    /* Remove user from state. */
    dispatch(logout());
  };
};

export default userSlice.reducer;
