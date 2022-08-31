import { useSelector, useDispatch } from 'react-redux'
import { addVote } from "../reducers/anecdoteReducer"

/* Component. */
const AnecdoteList = () => {

  /* Access state. */
  const anecdotes = useSelector(state => state)

  /* This is a redux hook. */
  const dispatch = useDispatch()

  /* Handle voting. */
  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVote(id))
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList