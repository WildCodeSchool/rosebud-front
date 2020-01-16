import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="Footer">
      <div className="Footer__wrapper">
        <p className="Footer__list__item">
          <a href="https://www.facebook.com/Ciclic.RegionCentre" target="_blank">
            {' '}
            <i className="Footer__icon fa fa-facebook-square" />
          </a>

        </p>
        <p className="Footer__list__item">
          <a href="https://twitter.com/Ciclic_CVL" target="_blank">
            {' '}
            <i className="Footer__icon fa fa-twitter-square" />
          </a>

        </p>
        <p className="Footer__list__item">
          <a href="https://upopi.ciclic.fr/" target="_blank">
            {' '}
            <i className="Footer__icon fa fa-instagram" />
          </a>

        </p>
      </div>
      <div className="Footer__copyright">
            © 2020 - Ciclic
      </div>
    </footer>
  );
}

export default Footer;
