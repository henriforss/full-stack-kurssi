/* Import necessary modules. */
import { useState } from "react"

/* Function to display blog post. */
const Blog = ({ blog }) => {
  /* Define variable "showDetails". */
  const [showDetails, setShowDetails] = useState(false)

  /* Function to toggle details. */
  const toggleDetails = () =>  {
    setShowDetails(!showDetails)
  }

  /* Inline styles for "details" and "nodetails". */
  const details = {
    "border": "2px",
    "border-style": "solid",
    "margin-top": "10px",
    "padding": "5px",
    "color": "Black",
  }
  
  const nodetails = {
    "border": "2px",
    "border-style": "solid",
    "margin-top": "10px",
    "padding": "5px",
    "color": "DimGrey",
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
          Likes: {blog.likes}
        </div>
        <div>
          Added by: {blog.user.name}
        </div>
      </div>  
    )
  }
}

export default Blog