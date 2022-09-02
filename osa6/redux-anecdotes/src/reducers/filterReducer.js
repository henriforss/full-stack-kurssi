import { createSlice } from "@reduxjs/toolkit"

const initialState = ""

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeFilter(state, action) {
      const filterValue = action.payload
      return filterValue
    }
  }
})

export const { changeFilter } = filterSlice.actions
export default filterSlice.reducer
