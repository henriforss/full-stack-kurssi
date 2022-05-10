/* Import necessary modules. */
import axios from "axios"
const baseUrl = "/api/blogs"

/* Get all blog. Note: this action requires
the user to be logged in, but the user's token is
not included in the request as per backend. */
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

/* Create new blog. */
const createNew = async (props) => {
  const token = `Bearer ${props.user.token}`
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, {
    title: props.title,
    author: props.author,
    url: props.url
  }, config)

  return response.data
}

/* Update likes. The props come from "./components/blog.js. The response
is sent back and the likes are updated in the frontend. */
const addLike = async (props) => {
  const id = props._id
  const newLikes = props.likes

  const response = await axios.put(`${baseUrl}/${id}`,
    { likes: newLikes }, { new: true })

  return response.data
}

/* Remowe blog. The props come from ./components/blog.js. The response
is sent back and the blogs-array is updated. */
const remoweBlog = async (props) => {
  const id = props.id
  const token = `Bearer ${props.token}`
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response
}


export default { getAll, createNew, addLike, remoweBlog }