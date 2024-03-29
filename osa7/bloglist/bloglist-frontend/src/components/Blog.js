/* Import necessary modules. */
import DeleteButton from "./DeleteButton";
import { useDispatch, useSelector } from "react-redux";
import { addLike, addComment } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useParams } from "react-router-dom";
import { useState } from "react";

/* Function to display blog post. */
const Blog = () => {
  /* Local variables. */
  const [comment, setComment] = useState("");

  /* Get params from React Router. */
  const params = useParams();
  const id = params.id;

  /* Redux state. */
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blog);

  /* Find correct blog in array of blogs. */
  const selectedBlog = blogs.find((blog) => blog._id === id);

  /* Redux hooks. */
  const dispatch = useDispatch();

  /* Function to like blog. No error handling here either. */
  const likeBlog = (blog) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 };
    dispatch(addLike(likedBlog));
    dispatch(
      setNotification(`Success: You liked blog "${blog.title}"`, 5, "success")
    );
  };

  /* Function to handle add comment. */
  const handleSubmit = (event) => {
    event.preventDefault();
    if (comment) {
      dispatch(addComment({ user, id, comment }));
      setComment("");
    }
  };

  if (!selectedBlog) {
    return null;
  } else {
    return (
      <div>
        <h3>
          {selectedBlog.title} by {selectedBlog.author}
        </h3>

        <div>
          URL: <a href={selectedBlog.url}>{selectedBlog.url}</a>
        </div>
        <div>
          Likes: {selectedBlog.likes}
          <button onClick={() => likeBlog(selectedBlog)}>Like</button>
        </div>
        <div>Added by: {selectedBlog.user.name}</div>
        <div>
          <DeleteButton blog={selectedBlog} user={user} />
        </div>

        <h4>Comments</h4>

        <form onSubmit={handleSubmit}>
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></input>
          <button type="submit">Add comment</button>
        </form>

        <ul>
          {selectedBlog.comments.map((comment, i) => {
            return <li key={i}>{comment}</li>;
          })}
        </ul>
      </div>
    );
  }
};

export default Blog;
