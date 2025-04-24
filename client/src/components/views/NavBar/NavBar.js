import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return(
        <Navbar variant="dark" className="bg-dark bg-gradient">
            <Container className="d-flex justify-content-around">
                <Nav>
                    <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link as={NavLink} to="/register">Sing up</Nav.Link>
                    <Nav.Link as={NavLink} to="/login">Sign in</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;