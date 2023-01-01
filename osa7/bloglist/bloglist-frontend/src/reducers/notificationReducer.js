import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
  style: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    /* These are actions. They take in the previous state and whatever action that is passed from above. They must return a new version of the state, that is, a copy of the previous state with modifications. They can not modify the state. */
    showNotification(state, action) {
      /* "content" is a string that is passed from above. It is the content of the notification message.  */
      const value = action.payload;
      /* The return is an object with the previous state and the new state of value. */
      return { ...state, value };
    },
    hideNotification(state, action) {
      const value = null;
      return { ...state, value };
    },
    /* This action returns a new style, which is a class, either .error or .success. Although I think .succes is not used. Because the initial state is an object, the return must also be an object. "action.payload" is the className for the style that is passed from above.  */
    updateNotificationStyle(state, action) {
      const style = action.payload;
      return { ...state, style };
    },
  },
});

export const { showNotification, hideNotification, updateNotificationStyle } =
  notificationSlice.actions;

let timeout = null;

/* This is a function that returns whatever should be dispatched to the store. This can be async, which might be useful if you need to communicate with a database. At the moment it is not async because there is no communication with a database. Check out the redux-anecdotes app for an example which includes async operations.*/
export const setNotification = (string, seconds, className) => {
  console.log("notification:", string, seconds, className);

  /* Dispatch here is a variable name. It represents the "dispatch" that calls the setNotification function. That is, what it really returns is the part inside the parenthesis. Then the dispatch is called in app.js. It took me a long time to understand this, I'm not sure if I still quite understand how it works. Anyway, the setNotification function is used if you want to perform async operations on whatever you're dispatching. Like if you have a database with notes. When you dispatch you call this function instead of calling the reducer directly, this function performs whatever async operation, like uploading a new note to the database, and afterwards dispatches the action and the new value to the store. showNotification is the action and the store knows about it, the value is the value. */
  const dispatchdata = (dispatch) => {
    /* First update the style className. */
    dispatch(updateNotificationStyle(className));

    /* Then update the notification message. */
    dispatch(showNotification(string));

    /* Set timeout for both. */
    if (timeout === null) {
      timeout = setTimeout(() => {
        dispatch(hideNotification());
        dispatch(updateNotificationStyle(null));
      }, seconds * 1000);
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        dispatch(hideNotification());
        dispatch(updateNotificationStyle(null));
      }, seconds * 1000);
    }
  };

  return dispatchdata;
};

export default notificationSlice.reducer;
