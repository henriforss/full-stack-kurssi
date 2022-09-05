import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = {
    content,
    votes: 0
  }
  const response = await axios.post(baseUrl, object)
  console.log(response)
  return response.data
}

const voteThis = async (id) => {
  const anecdoteToVote = await axios.get(`${baseUrl}/${id}`)
  const response = await axios.put(`${baseUrl}/${id}`, {
    ...anecdoteToVote.data,
    votes: anecdoteToVote.data.votes + 1
  })
  return response    
}

export default { getAll, createNew, voteThis }