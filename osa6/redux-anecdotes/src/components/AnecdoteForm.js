import { useDispatch } from "react-redux"

import { createAnecdote } from "../reducers/anecdoteReducer"

import { showNotification, hideNotification } from "../reducers/notificationReducer"
import anecdoteService from "../services/anecdoteService"

/* Component. */
const AnecdoteForm = () => {

  /* Create a redux hook. */
  const dispatch = useDispatch()
  
  /* Handle form. */
  const newAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ""
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
    dispatch(showNotification(newAnecdote.content))
    setTimeout(() => {
      dispatch(hideNotification(newAnecdote.content))
    }, 5000)
  }
  
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div><input name="note" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
