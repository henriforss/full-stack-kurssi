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

export default LoginForm