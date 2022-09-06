/* Note: this version uses connect() to access store, previous version uses hooks.
Previous version is better. */

import { connect } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

/* Component. */
const AnecdoteForm = (props) => {
  
  /* Handle form. */
  const newAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ""
    props.createAnecdote(content)
    props.setNotification(`New note: ${content}`, 5)
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

const mapDispatchToProps = (dispatch) => {
  return {
    createAnecdote: (value) => {
      dispatch(createAnecdote(value))
    },
    setNotification: (content, time) => {
      dispatch(setNotification(content, time))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)
