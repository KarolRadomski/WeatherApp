import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

//nagłówek aplikacji wyświetlany tylko gdy użytkownik jest zalogowany
function Header() {
  const dispatch = useDispatch();
  //funkcja obsługująca wylogowanie się użytkownika
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">WeatherApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav>
            <Nav.Link onClick={handleLogout}>Wyloguj się</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
