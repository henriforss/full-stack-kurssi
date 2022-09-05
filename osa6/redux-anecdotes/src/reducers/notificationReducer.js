import { createSlice } from "@reduxjs/toolkit"

const initialState = ""

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification(state, action) {
      const content = action.payload
      return content
    },
    hideNotification(state, action) {
      return ""
    }
  }
})

export const { showNotification, hideNotification } = notificationSlice.actions

export const setNotification = (string, seconds) => {
  return async dispatch => {
    dispatch(showNotification(string))
    setTimeout(() => {
      dispatch(hideNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
