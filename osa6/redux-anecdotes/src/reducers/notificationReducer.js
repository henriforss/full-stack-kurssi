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

let timeout = null

export const setNotification = (string, seconds) => {
  return async dispatch => {
    dispatch(showNotification(string))
    
    if (timeout === null) {
      timeout = setTimeout(() => {
        dispatch(hideNotification())  
        }, seconds * 1000)
    } else {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        dispatch(hideNotification())  
        }, seconds * 1000)
    }
  }
}

export default notificationSlice.reducer
