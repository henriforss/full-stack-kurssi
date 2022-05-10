/* Import necessary modules. */
import { useState } from "react"

/* Render form for create new blog. */
const CreateNewForm = (props) => {
  /* Define variables with useState. */
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  /* Bring "user" variable with props. It is needed in "blogObject",
  but probably also in App.js. Variables "title", "author", and "url" are
  probably not needed in App.js. */
  const user = props.user

  /* Create a blogObject with blog info. On submit
  createBlogOject passes blogObject to props.handleCreateNew,
  and resets variables. */
  const createBlogObject = (event) => {
    event.preventDefault()
    props.handleCreateNew({ user, title, author, url })
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  return (
    <div>
      <form onSubmit={createBlogObject}>
        <div>
          Title:
          <input
            text="text"
            value={title}
            name="title"
            onChange={event => setTitle(event.target.value)}
          />
        </div>
        <div>
          Author:
          <input
            text="text"
            value={author}
            name="author"
            onChange={event => setAuthor(event.target.value)}
          />
        </div>
        <div>
          URL:
          <input
            text="text"
            value={url}
            name="url"
            onChange={event => setUrl(event.target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default CreateNewForm