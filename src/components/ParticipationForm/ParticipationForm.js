import React, { useState, useEffect } from 'react';
import './ParticipationForm.css';
import axios from 'axios';
import useLocalStorage from 'react-use-localstorage';

window.onload = () => { localStorage.clear(); };

function ParticipationForm() {
  const [questions, setQuestions] = useState([]);
  const [step, setStep] = useState(0);
  const [imagePreview, SetImagePreimagePreview] = useLocalStorage(`image ${step}`, '');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/v1/questionnaires/1/questions');
      setQuestions(result.data);
    };
    fetchData();
  }, []);

  const submitParticipation = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    axios.post('/api/v1/questionnaires/1/participations', data);
    localStorage.clear();
    console.log(...data);
  };

  const changeStep = (value) => {
    setStep(step + value);
  };

  const addImagePreview = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      const base64data = reader.result;
      SetImagePreimagePreview(base64data);
    };
  };

  return (
    <div className="ParticipationForm">
      <form
        encType="multipart/formdata"
        onSubmit={submitParticipation}
      >
        {questions.length > 0
          && (
            <section>
              <div className={`participant ${step < 1 ? 'step--show' : 'step--hide'}`}>
                <div className="participant__presentation">
                  <h2 className="participant__presentation__title">
                  Classes pilotes Courts métrages / Jeu vidéo
                  </h2>
                  <p className="participant__presentation__content">
                  Vous avez participé aux classes pilotes Lycéens et apprentis au cinéma 2019/2020,
                  et nous vous proposons de terminer ce projet en répondant à quatre questions
                  autourdu cinéma et des jeux vidéos.
                  </p>
                </div>
                <div className="participant__wrapper">
                  <h2 className="participant__handing">
                    <i className="fa fa-caret-down participant__handing__icon" aria-hidden="true" />
                    Formulaire de participation
                  </h2>
                  <div className="participant__wrapper__form">
                    <label className="participant__input__tall" htmlFor="firstName">
                      <input className="form__input" name="firstName" type="text" placeholder="Prénom" />
                    </label>
                    <label className="participant__input__tall" htmlFor="lastname">
                      <input className="form__input" name="lastname" type="text" placeholder="Nom" />
                    </label>
                    <div className="participant__group__inputs">
                      <label className="participant__select" htmlFor="status">
                        <select className="form__select" name="status" defaultValue="">
                          <option value="">Statut</option>
                          <option value="teacher">Enseignant</option>
                          <option value="student">Élève</option>
                          <option value="other">Autre</option>
                        </select>
                      </label>
                      <label className="participant__input__small" htmlFor="age">
                        <input className="form__input" name="age" type="text" placeholder="Age" />
                      </label>
                    </div>
                    <label className="participant__input__tall" htmlFor="city">
                      <input className="form__input" name="city" type="text" placeholder="Ville" />
                    </label>
                    <label className="participant__input__tall" htmlFor="email">
                      <input className="form__input" name="email" type="text" placeholder="E-mail" />
                    </label>
                    <div className="pagination pagination--firststep">
                      <button className="participant__button" type="button" onClick={() => changeStep(1)}>Participer*</button>
                    </div>
                    <p className="participant__form__message">
                      {`*En soumettant ce formulaire, j'accepte que les informations saisies soient utilisées pour permettre à Ciclic Centre-Val de Loire, de me recontacter, pour m’envoyer des informations sur ses actions.
                      Conformément au Règlement Général sur la Protection des Données (RGPD), nous vous confirmons que vos données personnelles ne seront en aucun cas délivrées à des tiers.
                      Notre base de données est sécurisée et son contenu ne sera jamais cédé, échangé ou revendu.`}
                    </p>
                  </div>
                </div>
              </div>

              {
            questions.map((question, index) => (
              <div className={`${step === index + 1 ? 'step--show' : 'step--hide'}`} key={question.id}>
                <h3>{question.title}</h3>
                <label htmlFor={`answer-${index}-image`}>
                  <input name={`answer-${index}-image`} type="file" onChange={addImagePreview} />
                </label>
                {imagePreview
                  && (
                  <div>
                    <img src={imagePreview} alt="Preview" />
                  </div>
                  )}
                <label htmlFor={`answer-${index}-comment`}>
                  <textarea name={`answer-${index}-comment`} cols="30" rows="10" />
                </label>
                {step < questions.length
                  && (
                    <div className="pagination pagination--steps">
                      <button type="button" onClick={() => changeStep(-1)}>Précédent</button>
                      <button type="button" onClick={() => changeStep(1)}>Suivant</button>
                    </div>
                  )}
              </div>
            ))
          }
              {step === questions.length
            && (
              <div className="pagination pagination--laststep">
                <button type="button" onClick={() => changeStep(-1)}>Précédent</button>
                <button type="submit">Valider ma participation</button>
              </div>
            )}

            </section>
          )}
      </form>
    </div>
  );
}

export default ParticipationForm;
