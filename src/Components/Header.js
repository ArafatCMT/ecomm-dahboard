import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate()
    const User = JSON.parse(localStorage.getItem("user-info"))
    // console.log(User.username)
    function Logout() {
        localStorage.clear()
        navigate('/login')
    }
    return (
        <div>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand to="/">Navbar</Navbar.Brand>
                    <Nav className="me-auto navLinks">
                        {
                            localStorage.getItem("user-info") ?
                                <>
                                    <Link to="/">Products</Link>
                                    <Link to="/addProduct">Add Product</Link>
                                    <Link to="/updateProduct">Update Product</Link>
                                    <Link to="/search">Search Product</Link>
                                </>
                                :
                                <>
                                    <Link to="/login">Login</Link>
                                    <Link to="/register">Register</Link>
                                </>
                        }

                    </Nav>
                    {
                        localStorage.getItem("user-info") ?
                            <Nav>
                                <NavDropdown title={User.username}>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                    <NavDropdown.Item onClick={Logout}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            : null
                    }
                </Container>
            </Navbar>
        </div>
    )
}
export default Header;