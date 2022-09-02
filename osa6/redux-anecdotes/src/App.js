import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from './components/AnecdoteList'
import Notification from "./components/Notification"
import Filter from "./components/Filter"
import { useEffect } from "react"
import anecdoteService from "./services/anecdoteService"
import { setAnecdotes } from "./reducers/anecdoteReducer"
import { useDispatch } from "react-redux"

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService
      .getAll()
      .then(response => dispatch(setAnecdotes(response)))
    }, [dispatch])
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App