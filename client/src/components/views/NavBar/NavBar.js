import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { getUser } from "../../../redux/userReducer";
import { useSelector } from "react-redux";

const NavBar = () => {
    const user = useSelector(getUser);
    return(
        <Navbar variant="dark" className="bg-dark bg-gradient">
            <Container className="d-flex justify-content-around">
                <Nav>
                    <Nav.Link className="px-2" as={NavLink} to="/">Home</Nav.Link>
                    {user && <Nav.Link className="px-2" as={NavLink} to="/ads/add">Add</Nav.Link>}
                </Nav>
                <Nav>
                    {!user && <Nav.Link className="px-2" as={NavLink} to="/register">Sign up</Nav.Link>}
                    {!user && <Nav.Link className="px-2" as={NavLink} to="/login">Sign in</Nav.Link>}
                    {user && <Nav.Link className="px-2" as={NavLink} to="/auth/logout">Logout</Nav.Link>}
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;