import axios from 'axios'
const baseUrl = '/api/blogs'

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

/* Update likes. */


export default { getAll, createNew }