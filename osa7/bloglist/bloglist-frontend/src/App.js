/* Import necessary libraries/modules. */
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";

import loginService from "./services/login";
import blogService from "./services/blogs";
import Blog from "./components/Blog";
import CreateNewForm from "./components/CreateNewForm";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import LoginStatus from "./components/LoginStatus";
import Togglable from "./components/Togglable";

/* The app itself. */
const App = () => {
  /* Define variables. */
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  /* Redux hooks. */
  const dispatch = useDispatch();

  /* Get initial blogs with useEffect. */
  useEffect(() => {
    const fetchData = async () => {
      const blogs = await blogService.getAll();
      sortBlogs(blogs);
      setBlogs(blogs);
    };
    fetchData();
  }, []);

  /* Check if there is a user in window.localStorage. */
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  /* Function to sort blogs. "Props" is a list of blogs. This function is
  used when fetchData is called. Also it should be called when adding likes,
  in case adding likes changes the order, but at the moment that does not work. */
  const sortBlogs = (props) => {
    props.sort((a, b) => {
      return b.likes - a.likes;
    });
    setBlogs(props);
  };

  /* Handle log in. */
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
      /* I wrote somewhere that className="success" is not used. Well, now it is. This functionality was previously handled by useState, now by redux. */
      dispatch(setNotification("Success!", 5, "success"));
    } catch (exception) {
      /* This dispatch takes the function setNotification. The async function returns what would be the contents of the parenthesis. This is a little bit hard to understand. The parameters are: the message, seconds to show it, className of style to use. */
      dispatch(
        setNotification("Error: Wrong username or password.", 5, "error")
      );
    }
  };

  /* Handle log out. */
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  /* Function handleCreateNew, that is passed to CreateNewForm. The blogObject
  is created by CreateNewform in "./components/CreateNewForm.js".
  handleCreateNew makes sure the blogObject is sent to the server with
  blogservice.createNew. This function is called by CreateNewForm, not by App.
  The reason it is here is that it uses some of the variables here, ie.
  "blogs/setBlogs", "notificationStyle/setNotificationStyle",
  "notificationMessage/setNotificationMessage". Also it uses referred function
  "toggleVisibility". More specific variables have been moved to CreateNewForm. */
  const handleCreateNew = async (blogObject) => {
    try {
      const newBlog = await blogService.createNew(blogObject);
      setBlogs(blogs.concat(newBlog));
      /* These dispatches also used to be a useState. */
      dispatch(
        setNotification(
          `Blog added: ${newBlog.title}, ${newBlog.author}`,
          5,
          "success"
        )
      );
    } catch (exception) {
      dispatch(setNotification(`Error: ${exception.message}`, 5, "error"));
    }
    createNewFormRef.current.toggleVisibility();
  };

  /* Use useRef to get toggleVisibility
  from "./components/CreateNewForm.js. */
  const createNewFormRef = useRef();

  /* If user is not logged in. */
  if (user === null) {
    return (
      <div>
        <Notification />
        <h2>Log in to application</h2>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    );
  }

  /* If user is logged in. */
  return (
    <div>
      <Notification />
      <h2>Blogs</h2>
      <div>
        <LoginStatus handleLogout={handleLogout} user={user} />
      </div>
      <div>
        <Togglable buttonlabel="Create new blog" ref={createNewFormRef}>
          <h2>Create new</h2>
          <CreateNewForm handleCreateNew={handleCreateNew} user={user} />
        </Togglable>
      </div>
      <br />
      <div id="list-blogs">
        {blogs.map((blog) => (
          <Blog key={blog._id} blog={blog} user={user} setBlogs={setBlogs} />
        ))}
      </div>
    </div>
  );
};

export default App;
