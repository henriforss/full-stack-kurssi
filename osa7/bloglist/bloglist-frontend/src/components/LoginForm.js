/* Import necessary modules. */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../reducers/userReducer";

/* Render form for log in. */
const LoginForm = () => {
  /* Local states for keeping track of form. */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /* Redux hook. */
  const dispatch = useDispatch();

  const fullState = useSelector((state) => state);
  console.log(fullState);

  /* Handle submit. */
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(username, password));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          Log in
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
