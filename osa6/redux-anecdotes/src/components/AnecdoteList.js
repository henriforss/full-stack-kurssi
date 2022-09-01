import { useSelector, useDispatch } from 'react-redux'
import { addVote } from "../reducers/anecdoteReducer"
import { hideNotification, showNotification } from "../reducers/notificationReducer"

/* Component. */
const AnecdoteList = () => {

  /* Access state. */
  const anecdotes = useSelector(state => state.anecdotes)

  /* This is a redux hook. */
  const dispatch = useDispatch()

  /* Handle voting. */
  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    dispatch(addVote(anecdote.id))
    dispatch(showNotification(anecdote.content))
    setTimeout(() => {
      dispatch(hideNotification(anecdote.content))
    }, 5000)
  }
  
  return (
    <div>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>  // sort and map
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList