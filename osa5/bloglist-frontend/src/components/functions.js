/* Various functions used in the app. */

/* Render notification. */
const Notification = (props) => {
  if (props.notificationMessage === null) {
    return null
  } else {
    return (
      <div className={props.notificationStyle}>
        {props.notificationMessage}
      </div>
    )
  }
}

/* Render form for log in. */
const LoginForm = (props) => {
  return (
    <div>
      <form onSubmit={props.handleLogin}>
      <div>
        username 
          <input
          type="text"
          value={props.username}
          name="Username"
          onChange={event => props.setUsername(event.target.value)}
          />
      </div>
      <div>
        password
          <input
          type="password"
          value={props.password}
          name="Password"
          onChange={event => props.setPassword(event.target.value)}
          />
      </div>
      <button type="submit">Log in</button>
    </form>
    </div>
  )
}

/* Render log in status. */
const LoginStatus = (props) => {
  return (
    <div>
      <i>{props.user.name}</i> logged in.
      <button onClick={props.handleLogout}>Log out</button>
    </div>
  )
}

/* Render form for create new blog. */
const CreateNewForm = (props) => {
  return (
    <div>
      <form onSubmit={props.handleCreateNew}>
        <div>
          Title:
            <input
            text="text"
            value={props.title}
            name="title"
            onChange={event => props.setTitle(event.target.value)}
            />
        </div>
        <div>
          Author:
            <input
            text="text"
            value={props.author}
            name="author"
            onChange={event => props.setAuthor(event.target.value)}
            />
        </div>
        <div>
          URL:
            <input
            text="text"
            value={props.url}
            name="url"
            onChange={event => props.setUrl(event.target.value)}
            />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export { LoginForm, LoginStatus, CreateNewForm, Notification }