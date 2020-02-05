import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import logo from './images/logo.png';

function Header() {
  return (
    <div className="Header">
      <Link to="/">
        <h1 className="mark-ref"> </h1>
        <img className="Header__logo" src={logo} alt="Rosebud" />
      </Link>
    </div>
  );
}

export default Header;
