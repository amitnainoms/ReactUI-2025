import { Link, Outlet } from "react-router-dom";
import { Navbar, Nav as BootstrapNav, Container } from "react-bootstrap";
import { BsGrid3X3GapFill, BsChatDots, BsPeople, BsFileEarmarkText, BsBoxArrowRight } from 'react-icons/bs';

function Nav() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Navbar expand="lg" style={{ backgroundColor: '#2c3e50' }} variant="dark" className="shadow">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="fw-bold" style={{ fontSize: '1.5rem', color: '#fff' }}>
            <BsGrid3X3GapFill className="me-2" size={24} />
            Dashboard
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarSupportedContent" />
          <Navbar.Collapse id="navbarSupportedContent">
            <BootstrapNav className="ms-auto" style={{ gap: '0.5rem' }}>
              <BootstrapNav.Link as={Link} to="/groupchat">
                  <BsChatDots className="me-1" /> Group Chat
              </BootstrapNav.Link>
              <BootstrapNav.Link as={Link} to="/manageusers">
                  <BsPeople className="me-1" /> Manage Users
              </BootstrapNav.Link>
              <BootstrapNav.Link as={Link} to="/managedocuments">
                  <BsFileEarmarkText className="me-1" /> Manage Documents
              </BootstrapNav.Link>
              <BootstrapNav.Link as={Link} to="/logout">
                  <BsBoxArrowRight className="me-1" /> Logout
              </BootstrapNav.Link>
            </BootstrapNav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
}

export default Nav;
