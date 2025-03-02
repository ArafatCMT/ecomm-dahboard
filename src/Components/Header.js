import {Navbar, Nav, Container} from "react-bootstrap"
import { Link } from "react-router-dom";

function Header() {
    return (
        <div>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand to="/">Navbar</Navbar.Brand>
                    <Nav className="me-auto navLinks">
                        <Link to="/addProduct">Add Product</Link>
                        <Link to="/updateProduct">Update Product</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}
export default Header;