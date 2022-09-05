import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdoteService"

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      const anecdotes = action.payload
      console.log(anecdotes)
      return anecdotes
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    updateVote(state, action) {
      const id = action.payload.data.id
      const changedAnecdote = action.payload.data
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
    }
  }
})

export const { setAnecdotes, appendAnecdote, updateVote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVote = (id) => {
  return async dispatch => {
    const changedAnecdote = await anecdoteService.voteThis(id)
    console.log(changedAnecdote)
    dispatch(updateVote(changedAnecdote))
  }
}

export default anecdoteSlice.reducer