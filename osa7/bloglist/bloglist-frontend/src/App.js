/* Import necessary libraries/modules. */
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import loginService from "./services/login";
import { setLoggedUserInState } from "./reducers/userReducer";

/* Components. */
import CreateNewForm from "./components/CreateNewForm";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import LoginStatus from "./components/LoginStatus";
import Togglable from "./components/Togglable";
import BlogList from "./components/BlogList";

/* The app itself. */
const App = () => {
  /* Redux hooks. */
  const dispatch = useDispatch();

  /* Access state to get user. */
  const user = useSelector((state) => state.user);

  /* Check if there is a user in window.localStorage. This is the first thing we do. */
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setLoggedUserInState(user));
    }
  }, []);

  /* Get initial blogs with useEffect. */
  useEffect(() => {
    if (user) {
      /* This is where we dispatch to get all blogs. Notice that what we pass is a function. I missed this and spent an hour looking for an error. */
      dispatch(initializeBlogs());
    }
  }, [user]); // DOES THIS WORK OR NOT?

  console.log(user);

  /* Handle log out. */
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    // setUser(null);
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
        <LoginForm />
      </div>
    );
  }

  /* If user is logged in. */
  return (
    <div>
      <Notification />
      <h2>Blogs</h2>
      <div>
        <LoginStatus
        // handleLogout={handleLogout} user={user}
        />
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
