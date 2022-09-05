import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { showNotification, hideNotification } from "../reducers/notificationReducer"

/* Component. */
const AnecdoteForm = () => {

  /* Create a redux hook. */
  const dispatch = useDispatch()
  
  /* Handle form. */
  const newAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ""
    dispatch(createAnecdote(content))
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
