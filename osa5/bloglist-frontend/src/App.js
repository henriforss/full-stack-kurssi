/* Import necessary libraries/modules. */
import { useState, useEffect } from "react"
import { LoginForm, LoginStatus, CreateNewForm, Notification } from "./components/functions"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"

/* The app itself. */
const App = () => {

  /* Define variables. */
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationStyle, setNotificationStyle] = useState(null)

  /* Get initial blogs with useEffect. */
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  /* Check if there is a user in window.localStorage. */
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  /* Handle log in. */
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem(
        "loggedBlogappUser", JSON.stringify(user)
      )
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      setNotificationStyle("error")
      setNotificationMessage("Error: Wrong username or password.")
      setTimeout(() => setNotificationMessage(null), 5000)
    }
  }

  /* Handle log out. */
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser")
    setUser(null)
  }

  /* Handle create new blog. */
  const handleCreateNew = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.createNew({ user, title, author, url })
      setBlogs(blogs.concat(newBlog))
      setNotificationStyle("success")
      setNotificationMessage(`Blog added: ${newBlog.title}, ${newBlog.author}`)
      setTimeout(() => setNotificationMessage(null), 5000)
    } catch (exception) {
      setNotificationStyle("error")
      setNotificationMessage(`Error: ${exception.message}`)
      setTimeout(() => setNotificationMessage(null), 5000)
    }
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  /* If user is not logged in. */
  if (user === null) {
    return (
      <div>
        <Notification
          notificationMessage={notificationMessage}
          notificationStyle={notificationStyle}
        />
        <h2>Log in to application</h2>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    )
  }

  /* If user is logged in. */
  return (
    <div>
      <Notification
        notificationMessage={notificationMessage}
        notificationStyle={notificationStyle}
      />
      <h2>Blogs</h2>
      <div>
        <LoginStatus
          handleLogout = {handleLogout}
          user = {user}
        />
      </div>
      <div>
        <h2>Create new</h2>
        <CreateNewForm
          handleCreateNew={handleCreateNew}
          title={title}
          setTitle={setTitle}
          author={author}
          setAuthor={setAuthor}
          url={url}
          setUrl={setUrl}
        />
      </div>
      <br/>
      <div>
        {blogs.map(blog =>
          <Blog key={blog._id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default App
