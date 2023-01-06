/* Import necessary modules. */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/userReducer";
import { Form, Button } from "react-bootstrap";

/* Render form for log in. */
const LoginForm = () => {
  /* Local states for keeping track of form. */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /* Redux hook. */
  const dispatch = useDispatch();

  /* Handle submit. */
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(username, password));
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            name="username"
            onChange={(event) => setUsername(event.target.value)}
          />
          <Form.Label>Password:</Form.Label>

          <Form.Control
            type="password"
            value={password}
            name="password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button variant="primary" type="submit">
            Log in
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default LoginForm;
