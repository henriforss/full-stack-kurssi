/* Import necessary libraries/modules. */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { setLoggedUserInState } from "./reducers/userReducer";
import { initializeUsers } from "./reducers/usersReducer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Components. */
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import Users from "./components/Users";
import User from "./components/User";
import Blog from "./components/Blog";
import Navbar from "./components/Navbar";

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

  /* Get initial blogs and users with useEffect. */
  useEffect(() => {
    if (user) {
      /* This is where we dispatch to get all blogs. Notice that what we pass is a function. I missed this and spent an hour looking for an error. */
      dispatch(initializeBlogs());
      /* This is where we get the initial users. */
      dispatch(initializeUsers());
    }
  }, [user]);

  /* If user is not logged in. */
  if (user === null) {
    return (
      <div className="container">
        <Notification />
        <h2>Log in to Bloglist</h2>
        <LoginForm />
      </div>
    );
  }

  /* If user is logged in. */
  return (
    <BrowserRouter>
      <div className="container">
        <Notification />
        <Navbar />
        <h2>Blogs</h2>
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<Blog />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
