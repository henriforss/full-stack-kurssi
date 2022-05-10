/* Import necessary modules. */
import { useState } from "react"
import PropTypes from "prop-types"
import blogService from "../services/blogs"
import DeleteButton from "./DeleteButton"

/* Function to display blog post. */
const Blog = ({ blog, user, setBlogs }) => {
  /* Define variable "showDetails". */
  const [showDetails, setShowDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  /* Function to toggle details. */
  const toggleDetails = () =>  {
    setShowDetails(!showDetails)
  }

  /* Inline styles for "details" and "nodetails". */
  const details = {
    "border": "2px",
    "borderStyle": "solid",
    "marginTop": "10px",
    "padding": "5px",
    "color": "Black",
  }

  const nodetails = {
    "border": "2px",
    "borderStyle": "solid",
    "marginTop": "10px",
    "padding": "5px",
    "color": "DimGrey",
  }

  /* Function to add like. The likes in the frontend are updated after
  the database is updated. */
  const handleLike = async () => {
    blog.likes = likes + 1
    const response = await blogService.addLike(blog)
    setLikes(response.likes)
  }

  /* Render showDetails === true or showdetails === false. */
  if (showDetails === false) {
    return (
      <div style={nodetails}>
        <div>
          {blog.title} by {blog.author}
          <button onClick={toggleDetails}>Show</button>
        </div>
      </div>
    )
  } else {
    return (
      <div style={details}>
        <div>
          {blog.title} by {blog.author}
          <button onClick={toggleDetails}>Hide</button>
        </div>
        <div>
          URL: {blog.url}
        </div>
        <div>
          Likes: {likes}
          <button onClick={handleLike}>Like</button>
        </div>
        <div>
          Added by: {blog.user.name}
        </div>
        <div>
          <DeleteButton
            blog={blog}
            user={user}
            setBlogs={setBlogs}
          />
        </div>
      </div>
    )
  }
}

/* Define propTypes. */
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired,
}

export default Blog