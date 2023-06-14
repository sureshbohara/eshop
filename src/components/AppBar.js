import React from 'react';
import { Nav } from 'react-bootstrap';

function AppBar() {
  const isMobileView = window.innerWidth <= 767;
  if (!isMobileView) {
    return null;
  }

  const appBarStyle = {
    backgroundColor: '#333',
    padding: '10px',
    margin: '0',
    border: '1px solid #ccc',
  };

  const iconStyle = {
    marginRight: '5px',
    color: '#fff',
  };

  const linkStyle = {
    color: '#fff',
    fontSize: '16px',
  };

  return (
    <Nav className="fixed-bottom" style={appBarStyle}>
      <Nav.Item>
        <Nav.Link href="/" style={linkStyle}>
          <i className="bi bi-house-door-fill" style={iconStyle}></i>
          Home
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#" style={linkStyle}>
          <i className="bi bi-basket" style={iconStyle}></i>
          Cart
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#" style={linkStyle}>
          <i className="bi bi-whatsapp" style={iconStyle}></i>
          Call
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#" style={linkStyle}>
          <i className="bi bi-person-bounding-box" style={iconStyle}></i>
          Profile
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default AppBar;
