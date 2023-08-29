import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { getUser } from '../../../redux/usersRedux';

const NavBar = () => {
  const user = useSelector(getUser);

  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="lg"
      className="mt-4 mb-4 rounded">
      <Container>
        <Navbar.Brand>Ads.app</Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link to="/" as={NavLink}>
              Home
            </Nav.Link>
            {user === null && (
              <Nav.Link to="/login" as={NavLink}>
                Log In
              </Nav.Link>
            )}
            {user === null && (
              <Nav.Link to="/register" as={NavLink}>
                Sign Up
              </Nav.Link>
            )}
            {user !== null && (
              <Nav.Link to="/logout" as={NavLink}>
                Sign Out
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
