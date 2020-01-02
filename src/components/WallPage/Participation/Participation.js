import React from "react";
import "./Participation.scss";

const datas = [
  {
    id: 1,
    nom: "Pierre",
    prenom: "Dupond",
    comments: "je suis le premier commentaire",
    reponses: [
      {
        id: 1,
        url:
          "https://img4.cdn.cinoche.com/images/2545979f15444781bbd282e6e475feb0.jpg"
      },
      {
        id: 2,
        url:
          "https://tel.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Ftel.2F2019.2F11.2F08.2F60ee5033-efd6-4c73-9403-a8fbaf4486cf.2Ejpeg/530x230/quality/80/slumdog-millionaire-arte-tournage-clandestin-casting-laborieux-la-genese-de-ce-film-phenomene.jpg"
      },
      {
        id: 3,
        url:
          "https://upload.wikimedia.org/wikipedia/en/0/01/HarrietFilmPoster.jpeg"
      },
      {
        id: 4,
        url:
          "https://www.lepoint.fr/images/2017/11/13/11277831lpw-11278045-article-jpg_4757541.jpg"
      },
      {
        id: 5,
        url: "http://geekhebdo.com/wp-content/uploads/2015/04/rs-compressed.jpg"
      },
      { id: 6, url: "https://pic.clubic.com/v1/images/1752458/raw" }
    ]
  },
  {
    id: 2,
    nom: "Jeanne",
    prenom: "Mas",
    comments: "je suis le deuxiemes commentaire",
    reponses: [
      {
        id: 1,
        url:
          "https://img4.cdn.cinoche.com/images/2545979f15444781bbd282e6e475feb0.jpg"
      },
      {
        id: 2,
        url:
          "https://tel.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Ftel.2F2019.2F11.2F08.2F60ee5033-efd6-4c73-9403-a8fbaf4486cf.2Ejpeg/530x230/quality/80/slumdog-millionaire-arte-tournage-clandestin-casting-laborieux-la-genese-de-ce-film-phenomene.jpg"
      },
      {
        id: 3,
        url:
          "https://upload.wikimedia.org/wikipedia/en/0/01/HarrietFilmPoster.jpeg"
      },
      {
        id: 4,
        url:
          "https://www.lepoint.fr/images/2017/11/13/11277831lpw-11278045-article-jpg_4757541.jpg"
      },
      {
        id: 5,
        url: "http://geekhebdo.com/wp-content/uploads/2015/04/rs-compressed.jpg"
      },
      { id: 6, url: "https://pic.clubic.com/v1/images/1752458/raw" }
    ]
  }
];

const Participation = () => {
  return (
    <>
      {datas.map(data => (
        <div className="participation__content">
          <div className="participation__infos-personel">
            <h1>
              {data.nom}
              {data.prenom}
            </h1>
          </div>
          <div className="wrapper__content">
            <div className="wrapper">
              {data.reponses.map(reponse => (
                  <div className={`item__6-0${reponse.id}`}>
                    <img src={reponse.url} alt="" />
                    <div class="meta">
                      <h2>Lorem ipsum dolor sit.</h2>
                      <ul class="cta-list">
                        <li class="cta-item">
                          <i class="material-icons">&#xE8DC;</i>
                        </li>
                        <li class="cta-item">
                          <i class="material-icons">&#xE0B9;</i>
                        </li>
                        <li class="cta-item">
                          <i class="material-icons">&#xE80D;</i>
                        </li>
                        <li class="cta-item">
                          <i class="material-icons">&#xE5D4;</i>
                        </li>
                      </ul>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Participation;
