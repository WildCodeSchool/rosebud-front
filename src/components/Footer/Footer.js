import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="Footer">
      <div className="Footer__wrapper">
        <ul className="Footer__list">
          <h2 className="Footer__title">Informations</h2>
          <li className="Footer__list__item">Lorem ipsum</li>
          <li className="Footer__list__item">Ipsumlorem lox</li>
          <li className="Footer__list__item">Mentions Légales</li>
        </ul>
        <ul>
          <li className="Footer__list__item"><i className="Footer__icon fa fa-facebook-square" /></li>
          <li className="Footer__list__item"><i className="Footer__icon fa fa-twitter-square" /></li>
          <li className="Footer__list__item"><i className="Footer__icon fa fa-instagram" /></li>
        </ul>
      </div>
      <div className="Footer__copyright">
            © 2020 - Ciclic
      </div>
    </footer>
  );
}

export default Footer;
