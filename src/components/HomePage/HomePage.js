import React, { useState } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';

function HomePage() {
  const [linkToConsult, setLinkToConsult] = useState(false);

  const changeLinkResults = () => {
    setLinkToConsult(!linkToConsult);
  };

  return (
    <div className="HomePage">

      <div className="random__images__wrapper">
        <img className="random__image image__1" src="http://lorempixel.com/640/360/" alt="random home" />
        <img className="random__image image__2" src="http://lorempixel.com/641/361/" alt="random home" />
        <img className="random__image image__3" src="http://lorempixel.com/642/362/" alt="random home" />
        <img className="random__image image__4" src="http://lorempixel.com/643/363/" alt="random home" />
        <img className="random__image image__5" src="http://lorempixel.com/644/364/" alt="random home" />
        <div className="random__images__button__wrapper">
          <button type="button" className="random__images__button">
            <i className="random__images__button__icon fa fa-plus-square" />
            <p className="random__images__button__content">Participer</p>
          </button>
        </div>
      </div>

      <section className="home__counters">
        <div className="home__counters__title">
            12
          <span className="home__counters__length">thématiques</span>
        </div>
        <div className="home__counters__title">
            142
          <span className="home__counters__length">questionnaires</span>
        </div>
        <div className="home__counters__title">
            463
          <span className="home__counters__length">participants</span>
        </div>
      </section>

      <section className="about__us">
        <div className="about__us__wrapper">
          <h2 className="about__us__title">
            <i className="about__us__icon fa fa-info" />
                À propos de Rosebud
          </h2>
          <p className="about__us__content">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem
            {' '}
            <strong>debitis</strong>
            {' '}
            commodi magnam soluta! In debitis, officiis, a nam
            {' '}
            <strong>repellat</strong>
            {' '}
            tenetur ex, vero dignissimos ad doloribus reiciendis? Eum eius qui vitae!
          </p>
        </div>
      </section>

      <section className="home__search">
        <div className="home__search__input__wrapper">
          <input type="text" placeholder="Rechercher..." className="home__search__input" />
        </div>
        <div className="search__results">
          <div className="search__results__buttons">
            <button type="button" className={`search__results__button ${!linkToConsult && 'search__results__button--active'}`} onClick={changeLinkResults}>Participer</button>
            <button type="button" className={`search__results__button ${linkToConsult && 'search__results__button--active'}`} onClick={changeLinkResults}>Consulter</button>
          </div>
          <div className="search__results__wrapper">
            <Link to={`${linkToConsult ? '/questionnaire/1/consulter/' : '/questionnaire/1/participer/'}`} className="search__results__item">
              <div className="search__results__item__infos">
                <h3 className="search__results__item__title">Classes pilotes Courts métrages / Jeu vidéo</h3>
                <p className="search__results__item__content">Lorem ipsum dolor sit amet consectetur adipisicing sicing elit...</p>
              </div>
              <div className="search__results__access">
                {linkToConsult
                  ? <i className="fa fa-eye" />
                  : <i className="fa fa-arrow-right" />}
              </div>
            </Link>
            <Link to={`${linkToConsult ? '/questionnaire/1/consulter/' : '/questionnaire/1/participer/'}`} className="search__results__item">
              <div className="search__results__item__infos">
                <h3 className="search__results__item__title">Classes pilotes Courts métrages / Jeu vidéo</h3>
                <p className="search__results__item__content">Lorem ipsum dolor sit amet consectetur adipisicing sicing elit...</p>
              </div>
              <div className="search__results__access">
                {linkToConsult
                  ? <i className="fa fa-eye" />
                  : <i className="fa fa-arrow-right" />}
              </div>
            </Link>
            <Link to={`${linkToConsult ? '/questionnaire/1/consulter/' : '/questionnaire/1/participer/'}`} className="search__results__item">
              <div className="search__results__item__infos">
                <h3 className="search__results__item__title">Classes pilotes Courts métrages / Jeu vidéo</h3>
                <p className="search__results__item__content">Lorem ipsum dolor sit amet consectetur adipisicing sicing elit...</p>
              </div>
              <div className="search__results__access">
                {linkToConsult
                  ? <i className="fa fa-eye" />
                  : <i className="fa fa-arrow-right" />}
              </div>
            </Link>
          </div>
          <div className="search__results__pagination">
            <span className="search__results__pagination__item search__results__pagination__item--active" />
            <span className="search__results__pagination__item" />
            <span className="search__results__pagination__item" />
          </div>
        </div>
      </section>

    </div>
  );
}

export default HomePage;
