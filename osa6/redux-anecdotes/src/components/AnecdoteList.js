import { useSelector, useDispatch } from 'react-redux'

import { addVote } from "../reducers/anecdoteReducer"

import { setNotification } from "../reducers/notificationReducer"

/* Component. */
const AnecdoteList = () => {

  /* Access state. */
  let anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  /* Filter anecdotes by filter. */
  anecdotes = anecdotes.filter(a => {
    const anecdote = a.content.toLowerCase()
    const includesFilter = anecdote.includes(filter) 
    if (includesFilter) {
      return a
    }
  })

  /* This is a redux hook. */
  const dispatch = useDispatch()

  /* Handle voting. */
  const vote = (anecdote) => {
    dispatch(addVote(anecdote.id))
    dispatch(setNotification(`you voted "${anecdote.content}"`, 3))
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