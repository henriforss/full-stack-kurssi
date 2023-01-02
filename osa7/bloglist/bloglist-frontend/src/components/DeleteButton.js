/* Import necessary modules. */
import { useDispatch } from "react-redux";
import { destroyBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

/* Component to delete blog post if owner of blog post is user. */
const DeleteButton = ({ blog, user }) => {
  const token = user.token;
  const id = blog._id;

  const dispatch = useDispatch();

  const handleDelete = async () => {
    const confirm = window.confirm(`Delete blog: ${blog.title}?`);
    if (confirm) {
      dispatch(destroyBlog({ id, token }));
      dispatch(setNotification(`Blog deleted: ${blog.title}`, 5, "success"));
    }
  };

  if (blog.user.username === user.username) {
    return (
      <button id="delete-button" onClick={handleDelete}>
        Delete
      </button>
    );
  }
};

export default DeleteButton;
