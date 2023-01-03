import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer";

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
    <div>
      <i>{user.name}</i> logged in.
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default LoginStatus;
