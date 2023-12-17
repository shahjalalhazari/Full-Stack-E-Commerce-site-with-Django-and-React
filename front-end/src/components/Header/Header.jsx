import { Container, Nav, Navbar } from "react-bootstrap";

const Header = () => {
    return (
      <Header>
        <Navbar expand="lg" className="bg-dark" variant="dark" collapseOnSelect>
          <Container>
            <Navbar.Brand href="/">ProShop</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/cart">
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
                <Nav.Link href="/login">
                  <i className="fas fa-user"></i> Login
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        This is from Header Components.
      </Header>
    );
};

export default Header;