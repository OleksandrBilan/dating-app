import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../Services/auth";
import s from "./style.module.css";

export function CustomNavbar() {
  const navigate = useNavigate();

  function OnLogOut() {
    AuthService.deleteAuthTokenCookie();
    AuthService.removeAuthTokenFromAxios();
    navigate("/login");
  }

  return (
    <Navbar bg="dark" variant="dark" fixed="top" className={s.navbar}>
      <Container>
        <Navbar.Brand href="" onClick={() => navigate("/")}>
          Dating App
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Nav className="me-auto">
            <Nav.Link href="" onClick={OnLogOut}>
              Log Out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
