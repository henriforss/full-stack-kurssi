import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const { content, id, votes } = action.payload
      const newAnecdote = {
        content,
        id,
        votes
      }
      state.push(newAnecdote)
    },
    addVote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(note => note.id === id)
      const newVotes = anecdoteToChange.votes + 1
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: newVotes
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
    },
    setAnecdotes(state, action) {
      const anecdotes = action.payload
      console.log(anecdotes)
      return anecdotes
    }
  }
})

export const { createAnecdote, addVote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer