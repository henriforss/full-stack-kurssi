/* Import necessary modules. */
import blogService from "../services/blogs"

/* Component to delete blog post if owner of blog post is user. */
const DeleteButton = ({ blog, user, setBlogs }) => {
  const token = user.token
  const id = blog._id

  const handleDelete = async () => {
    const confirm = window.confirm(`Delete blog: ${blog.title}?`)
    if (confirm) {
      const response = await blogService.remoweBlog({ id, token })
      console.log(response)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
  }

  if (blog.user.username === user.username) {
    return (
      <button onClick={handleDelete}>Delete</button>
    )
  }
}

export default DeleteButton