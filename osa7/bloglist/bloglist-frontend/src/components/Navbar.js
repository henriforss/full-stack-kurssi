import { Link } from "react-router-dom";
import LoginStatus from "./LoginStatus";

const Navbar = () => {
  return (
    <div>
      <Link to="/">Blogs</Link>
      <Link to="/users">Users</Link>
      <LoginStatus />
    </div>
  );
};

export default Navbar;
