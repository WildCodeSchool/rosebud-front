import React from 'react';
import './Header.css';
import logo from './images/logo.png';

function Header() {
  return (
    <div className="Header">
      <a href="./">
        <img className="Header__logo" src={logo} alt="Rosebud" />
      </a>
    </div>
  );
}

export default Header;
