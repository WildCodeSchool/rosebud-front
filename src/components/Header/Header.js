import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import logo from './images/logo.png';

function Header() {
  return (
    <div className="Header">
      <h1 className="mark-ref">Œuvre participative sur les images qui nous animent</h1>
      <Link to="/">
        <img className="Header__logo" src={logo} alt="Rosebud" />
      </Link>
    </div>
  );
}

export default Header;
