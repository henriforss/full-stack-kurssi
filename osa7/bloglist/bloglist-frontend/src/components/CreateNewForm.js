/* Import necessary modules. */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogReducer";

/* Render form for create new blog. */
const CreateNewForm = ({ createNewFormRef }) => {
  /* Define variables with useState. */
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  /* Redux state. */
  const user = useSelector((state) => state.user);

  /* Redux hooks. */
  const dispatch = useDispatch();

  /* Function to submit new blog. No error handling. Did not get it. */
  const submitBlog = async (event) => {
    event.preventDefault();
    if (title && url) {
      const blogObject = { user, title, author, url };
      dispatch(createBlog(blogObject));
      dispatch(
        setNotification(`Blog added : ${title} by ${author}`, 5, "success")
      );
      setTitle("");
      setAuthor("");
      setUrl("");
      createNewFormRef.current.toggleVisibility();
    } else {
      dispatch(setNotification("Title or URL missing", 5, "error"));
    }
  };

  return (
    <div>
      <form onSubmit={submitBlog}>
        <div>
          Title:
          <input
            id="title"
            text="text"
            value={title}
            name="title"
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          Author:
          <input
            id="author"
            text="text"
            value={author}
            name="author"
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          URL:
          <input
            id="url"
            text="text"
            value={url}
            name="url"
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <button id="create-button" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateNewForm;
