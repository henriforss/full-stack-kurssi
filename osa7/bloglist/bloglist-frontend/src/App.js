/* Import necessary libraries/modules. */
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";

import loginService from "./services/login";
import CreateNewForm from "./components/CreateNewForm";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import LoginStatus from "./components/LoginStatus";
import Togglable from "./components/Togglable";
import BlogList from "./components/BlogList";

/* The app itself. */
const App = () => {
  /* Define variables. */
  // const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  /* Redux hooks. */
  const dispatch = useDispatch();

  /* Check if there is a user in window.localStorage. This is the first thing we do. */
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  /* Get initial blogs with useEffect. */
  useEffect(() => {
    /* This is where we dispatch to get all blogs. Notice that what we pass is a function. I missed this and spent an hour looking for an error. */
    dispatch(initializeBlogs());
  }, [dispatch]);

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
      dispatch(setNotification("Success: You have logged in.", 5, "success"));
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
          <CreateNewForm user={user} createNewFormRef={createNewFormRef} />
        </Togglable>
      </div>
      <br />
      <BlogList user={user} />
    </div>
  );
};

export default App;
