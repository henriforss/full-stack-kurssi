import { Link } from "react-router-dom";
import LoginStatus from "./LoginStatus";
import { Navbar as BootNavbar, Nav } from "react-bootstrap";

const Navbar = () => {
  return (
    <BootNavbar
      collapseOnSelect
      expand="lg"
      style={{ backgroundColor: "#000000", padding: "10px" }}
      variant="dark"
    >
      <BootNavbar.Toggle aria-controls="responsive-navbar-nav" />
      <BootNavbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav className="navbar-brand">Bloglist</Nav>
          <Nav.Link href="#" as="span">
            <Link to="/">Blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to="/users">Users</Link>
          </Nav.Link>
          <div className="navbar-text">
            <LoginStatus />
          </div>
        </Nav>
      </BootNavbar.Collapse>
    </BootNavbar>
  );
};

export default Navbar;
