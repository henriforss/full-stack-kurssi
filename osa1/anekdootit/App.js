import { useState } from 'react'



/* DisplayAnecdote displays the (randomly) selected anecdote
and the number of votes it has. */
const DisplayAnecdote = (props) => {
  return (
    <div>
      <div>
        {props.anecdotes[props.selected]}
      </div>
      <div>
        has {props.votes[props.selected]} votes
      </div>
    </div>
  )
}


/* DisplayStatistics displays the mosts voted anecdote
and the number of votes it has. */
const DisplayStatistics = (props) => {
  return (
    <div>
      <div>
        {props.anecdotes[props.index]}
      </div>
      <div>
        has {props.votes[props.index]} votes
      </div>
    </div>
  )
}


/* Just a button. */
const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}


/* The app itself. */
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when examining patients.'
  ]  

  const [selected, setSelected] = useState(0)
  
  /* selectRandom is used for selecting a random number,
  which is used to select a quote from the list. */ 
  const selectRandom = () => {
    const randomNumber = Math.floor(Math.random() * 7)
    setSelected(randomNumber)   
  }
  
  /* To vote, first we make an array filled with zeros.
  Then we use the array as the initial state for useState.
  Then we use the function voteNow to copy the array, 
  increment the current value, and set a new state with setVotes. */
  const emptyArray = new Array(7).fill(0)

  const [votes, setVotes] = useState(emptyArray)

  const voteNow = () => {
    const copy = [...votes]
    copy[selected] += 1
    console.log(copy)
    setVotes(copy)
  }

  const mostVotes = () => {
    const maxVotes = Math.max(...votes)
    const index = votes.indexOf(maxVotes)
    return (
      index
    )
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <DisplayAnecdote anecdotes={anecdotes} votes={votes} selected={selected} />
      <Button handleClick={voteNow} text="Vote" />
      <Button handleClick={selectRandom} text="Next anecdote" />
      <h1>Anecdote with most votes</h1>
      <DisplayStatistics anecdotes={anecdotes} votes={votes} index={mostVotes()} />
    </div>
  )
}



export default App

