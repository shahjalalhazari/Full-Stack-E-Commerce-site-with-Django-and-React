import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

const Header = () => {
  const userInfoFromLS = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(userInfoFromLS);

  const handleUserLogout = () => {
    console.log("User Logged Out");
  };

  return (
    <header>
      <Navbar expand="lg" className="bg-dark" variant="dark" collapseOnSelect>
        <Container>
          <Link to={"/"}>
            <Navbar.Brand href="/">ProShop</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">
                <i className="fas fa-house"></i> Home
              </Nav.Link>
              <Nav.Link href="/cart">
                <i className="fas fa-shopping-cart"></i> Cart
              </Nav.Link>

              {userInfo ? (
                <>
                  <NavDropdown
                    id="username"
                    title={
                      <>
                        <i
                          className="fas fa-user"
                          style={{ marginRight: "5px" }}
                        ></i>
                        {userInfo.name}
                      </>
                    }
                    menuVariant="dark"
                  >
                    {/* User Profile */}
                    <LinkContainer to={"/user/profile"}>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>

                    {/* User Logout */}
                    <NavDropdown.Item onClick={handleUserLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <Nav.Link href="/user/login">
                  <i className="fas fa-user"></i> Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
