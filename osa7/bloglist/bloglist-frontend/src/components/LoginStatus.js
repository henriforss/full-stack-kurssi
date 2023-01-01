/* Render log in status. */
const LoginStatus = (props) => {
  return (
    <div>
      <i>{props.user.name}</i> logged in.
      <button onClick={props.handleLogout}>Log out</button>
    </div>
  );
};

export default LoginStatus;
