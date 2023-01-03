/* Import necessary modules. */
import { useState } from "react";
import PropTypes from "prop-types";
import DeleteButton from "./DeleteButton";
import { useDispatch, useSelector } from "react-redux";
import { addLike } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

/* Function to display blog post. */
const Blog = ({ blog }) => {
  /* Define variable "showDetails". */
  const [showDetails, setShowDetails] = useState(false);

  /* Redux state. */
  const user = useSelector((state) => state.user);

  /* Redux hooks. */
  const dispatch = useDispatch();

  /* Function to toggle details. */
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  /* Inline styles for "details" and "nodetails". */
  const details = {
    border: "2px",
    borderStyle: "solid",
    marginTop: "10px",
    padding: "5px",
    color: "Black",
  };

  const nodetails = {
    border: "2px",
    borderStyle: "solid",
    marginTop: "10px",
    padding: "5px",
    color: "DimGrey",
  };

  /* Function to like blog. No error handling here either. */
  const likeBlog = (blog) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 };
    dispatch(addLike(likedBlog));
    dispatch(
      setNotification(`Success: You liked blog "${blog.title}"`, 5, "success")
    );
  };

  /* Render showDetails === true or showdetails === false. */
  if (showDetails === false) {
    return (
      <div style={nodetails}>
        <div className="blog-element">
          {blog.title} by {blog.author}
          <button id="show-details" onClick={toggleDetails}>
            Show
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div style={details}>
        <div>
          {blog.title} by {blog.author}
          <button onClick={toggleDetails}>Hide</button>
        </div>
        <div>URL: {blog.url}</div>
        <div className="likes">
          Likes: {blog.likes}
          <button id="like-button" onClick={() => likeBlog(blog)}>
            Like
          </button>
        </div>
        <div>Added by: {blog.user.name}</div>
        <div>
          <DeleteButton blog={blog} user={user} />
        </div>
      </div>
    );
  }
};

/* Define propTypes. */
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
