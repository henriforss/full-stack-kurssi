import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer";
import { Button } from "react-bootstrap";

/* Render log in status. */
const LoginStatus = () => {
  /* Access redux state. */
  const user = useSelector((state) => state.user);

  /* Redux hook. */
  const dispatch = useDispatch();

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logoutUser());
    dispatch(setNotification("Logged out.", 5, "success"));
  };
  return (
    <>
      <i>{user.name}</i> logged in.
      <Button onClick={handleLogout}>Log out</Button>
    </>
  );
};

export default LoginStatus;
