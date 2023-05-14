import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../../Services/auth";
import s from "./style.module.css";
import { NavDropdown } from "react-bootstrap";

export function CustomNavbar() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userInfo = AuthService.getUserInfo();
    setIsAdmin(userInfo.roles.includes("Admin"));
  }, []);

  function OnLogOut() {
    AuthService.deleteAuthTokenCookie();
    AuthService.removeAuthTokenFromAxios();
    navigate("/login");
  }

  return (
    <Navbar bg="dark" variant="dark" fixed="top" className={s.navbar}>
      <Container>
        <Navbar.Brand href="" onClick={() => navigate("/")}>
          SoulSync
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAdmin ? (
              <>
                <Nav.Link
                  href=""
                  onClick={() => navigate("/adminQuestionnaire")}
                >
                  Questionnaire
                </Nav.Link>
                <Nav.Link
                  href=""
                  onClick={() => navigate("/adminSubscriptions")}
                >
                  VIP requests
                </Nav.Link>
              </>
            ) : (
              <>
                <NavDropdown title="Recommendations">
                  <NavDropdown.Item
                    href=""
                    onClick={() => navigate("/usersRecommendations")}
                  >
                    Search users
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href=""
                    onClick={() => navigate("/userLikes")}
                  >
                    Who liked me
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href=""
                    onClick={() => navigate("/userMutualLikes")}
                  >
                    Mutual likes
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="" onClick={() => navigate("/userChats")}>
                  My chats
                </Nav.Link>
                <Nav.Link
                  href=""
                  onClick={() => navigate("/userQuestionnaire")}
                >
                  My questionnaire
                </Nav.Link>
                <Nav.Link href="" onClick={() => navigate("/editUserProfile")}>
                  My profile
                </Nav.Link>
                <Nav.Link href="" onClick={() => navigate("/upgradeToVip")}>
                  Upgrade to VIP
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Nav className="ml-auto">
            <Nav.Link href="" onClick={OnLogOut}>
              Log Out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
