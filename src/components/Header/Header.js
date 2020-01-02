import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import logo from './images/logo.png';

function Header() {
  return (
    <div className="Header">
      <Link to="/">
        <img className="Header__logo" src={logo} alt="Rosebud" />
      </Link>
    </div>
  );
}

export default Header;
