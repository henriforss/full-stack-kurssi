/* This is a blog reducer, a collection of reducers that are included in a store slice. A reducer is a redux function. Here we use createSlice(), redux toolkit function, to create a slice in the store for blog related states and the actions that change them. We can dispatch these actions directly from the "app" but it might be smarter to create helper functions, because the helper functions can be async, in case you need to do something between the dispatch is called and executed. Like do something in the database and then use the return from the database to update the local state, or not, in case there is an error in the connection between the backend and the database. */

import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

/* The initial state for the blogs is an empty array. */
const initialState = [];

/* createSlice() is a function that accepts a single configuration object parameter with certain options. */
const blogSlice = createSlice({
  /* This is the name of the slice in the store. */
  name: "blog",
  /* Initial state. */
  initialState,
  /* This is an object of reducer functions. The reducer functions accept two parameters, the previous state and actions. I think the function name is also the key name. */
  reducers: {
    /* This one sets an array of blog objects in the state. The array is passed in action.payload. It overwrites whatever is in the previous state. The return is the new state. */
    setBlogs: (state, action) => {
      const arrayOfBlogs = action.payload;
      return arrayOfBlogs;
    },
    appendBlog: (state, action) => {
      const newBlogObject = action.payload;
      /* No returning of state here. Instead there is push. */
      state.push(newBlogObject);
    },
    likeBlog: (state, action) => {
      const id = action.payload._id;
      const likedBlog = action.payload;
      return state.map((item) => (item._id !== id ? item : likedBlog));
    },
    deleteBlog: (state, action) => {
      const idOfDeletedBlog = action.payload._id;
      return state.filter((item) => item._id !== idOfDeletedBlog);
    },
    eraseState: (state, action) => {
      return [];
    },
    commentBlog: (state, action) => {
      const id = action.payload._id;
      const updatedBlog = action.payload;
      return state.map((item) => (item._id !== id ? item : updatedBlog));
    },
  },
});

/* We need to export the action types, so that we can use them when we dispatch actions. */
export const {
  setBlogs,
  appendBlog,
  likeBlog,
  deleteBlog,
  eraseState,
  commentBlog,
} = blogSlice.actions;

/* This is a helper function. It is called with a useEffect in the app. This helper funtion is passed to the dispatch, it communicates with the database and gets the blogs, then it returns the correct action type and the blogs, which will be set in the state. This function can not be async, it must be a plain object, using async needs middleware or must be written like below. */
export const initializeBlogs = () => {
  /* Create a dispatch that is returned to the original dispatch. */
  const toDispatch = async (dispatch) => {
    /* Start by calling blogService.getAll() to get an array of blogs from backend/database. */
    const response = await blogService.getAll();
    /* Then pass the blogs to the setBlogs action. */
    dispatch(setBlogs(response));
  };
  /* And return the dispatch to the original dispatch. */
  return toDispatch;
};

/* Helper function to create new blog. There is no error handling here. I don't know what to do. */
export const createBlog = (blogObject) => {
  const toDispatch = async (dispatch) => {
    const response = await blogService.createNew(blogObject);
    dispatch(appendBlog(response));
  };
  return toDispatch;
};

/* The reason I'm having a hard time undertanding what happens here is that this is redux syntax. This is actually a redux thunk middleware function and redux thunk is included in redux toolkit. This pattern is explained in the redux ducomentation. */
export const addLike = (blogObject) => {
  const toDispatch = async (dispatch) => {
    const response = await blogService.addLike(blogObject);
    dispatch(likeBlog(response));
  };
  return toDispatch;
};

export const destroyBlog = ({ id, token }) => {
  return async (dispatch) => {
    const response = await blogService.remoweBlog({ id, token });
    dispatch(deleteBlog(response.data));
  };
};

/* This function is used when the user logs out. The blogs array is reset in state. */
export const removeBlogsFromState = () => {
  return (dispatch) => {
    dispatch(eraseState());
  };
};

/* Add comment to blog. */
export const addComment = (props) => {
  const { user, id, comment } = props;
  const token = user.token;

  return async (dispatch) => {
    try {
      const commentedBlog = await blogService.commentThisBlog({
        token,
        id,
        comment,
      });
      dispatch(commentBlog(commentedBlog.data));
      dispatch(setNotification(`Comment added "${comment}".`, 5, "success"));
    } catch (error) {
      console.log(error);
      dispatch(setNotification("Error", 5, "error"));
    }
  };
};

/* We need to export the blogSlice. More specific we need to export the reducer function of the blogSlice. */
export default blogSlice.reducer;
