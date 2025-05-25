import React, { useContext, useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import logo from "../../assets/img/forge.jpg";
import navIcon1 from "../../assets/img/nav-icon1.svg";
import navIcon2 from "../../assets/img/nav-icon2.svg";
import navIcon3 from "../../assets/img/nav-icon3.svg";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { useUser } from "../../context/UserContext";

export const NavBar = ({ onShowProjectModal }) => {
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const handleEditProjects = () => {
    navigate("/projects");
  };

  return (
    <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="Logo" className="dofla" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/"
              className={
                activeLink === "home" ? "active navbar-link" : "navbar-link"
              }
              onClick={() => onUpdateActiveLink("home")}
            >
              Accueil
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/projects"
              className={
                activeLink === "projects" ? "active navbar-link" : "navbar-link"
              }
              onClick={() => onUpdateActiveLink("projects")}
            >
              Projets
            </Nav.Link>
            {!user ? (
              <>
                <Nav.Link
                  as={Link}
                  to="/login"
                  className={
                    activeLink === "login" ? "active navbar-link" : "navbar-link"
                  }
                  onClick={() => onUpdateActiveLink("login")}
                >
                  Connexion
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/register"
                  className={
                    activeLink === "register" ? "active navbar-link" : "navbar-link"
                  }
                  onClick={() => onUpdateActiveLink("register")}
                >
                  Inscription
                </Nav.Link>
              </>
            ) : (
              <>
                <Button variant="secondary" onClick={handleEditProjects}>
                  Modifier les projets
                </Button>
                <Button variant="danger" onClick={handleLogout}>
                  Déconnexion
                </Button>
              </>
            )}
          </Nav>
          <span className="navbar-text">
            <div className="social-icon">
              <a href="https://www.linkedin.com/in/hicham-roldan-152a051b6/">
                <img src={navIcon1} alt="icône de LinkedIn" />
              </a>
              <a href="https://github.com/HDevv">
                <img src={navIcon2} alt="icône de github" />
              </a>
              <a href="https://twitter.com/ash___dev">
                <img src={navIcon3} alt="logo de twitter" />
              </a>
            </div>
            <button
              onClick={() => {
                console.log("Thème changé :", theme);
                toggleTheme();
              }}
              className="theme-toggle-btn"
            >
              {theme === "light" ? "🌙 Mode Sombre" : "☀️ Mode Clair"}
            </button>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
