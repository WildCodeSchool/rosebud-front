import React, { useState, useEffect } from 'react';
import './ParticipationForm.css';
import axios from 'axios';
import useLocalStorage from 'react-use-localstorage';
import { useParams } from 'react-router-dom';

window.onload = () => { localStorage.clear(); };

function ParticipationForm() {
  const [questions, setQuestions] = useState([]);
  const [step, setStep] = useState(0);
  const [imagePreview, SetImagePreimagePreview] = useLocalStorage(`image ${step}`, '');
  const { questionnaireId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`/api/v1/questionnaires/${questionnaireId}/questions`);
      setQuestions(result.data);
    };
    fetchData();
  }, [questionnaireId]);

  const submitParticipation = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    axios.post('/api/v1/questionnaires/1/participations', data);
    localStorage.clear();
  };

  const changeStep = (value) => {
    setStep(step + value);
  };

  const getImagePreview = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        const base64data = reader.result;
        SetImagePreimagePreview(base64data);
      };
    }
  };

  return (
    <div className="ParticipationForm">
      <form
        encType="multipart/formdata"
        onSubmit={submitParticipation}
        noValidate
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
                      <input required="required" autoComplete="off" className="form__input" name="firstName" type="text" placeholder="Prénom" />
                    </label>
                    <label className="participant__input__tall" htmlFor="lastName">
                      <input autoComplete="off" className="form__input" name="lastName" type="text" placeholder="Nom" />
                    </label>
                    <div className="participant__group__inputs">
                      <label className="participant__select" htmlFor="status">
                        <select className="form__select" name="status" defaultValue="">
                          <option disabled="disabled">Statut</option>
                          <option value="student">Élève/étudiant</option>
                          <option value="teacher">Enseignant</option>
                          <option value="other">Autre</option>
                        </select>
                      </label>
                      <label className="participant__input__small" htmlFor="age">
                        <input required="required" autoComplete="off" className="form__input" name="age" type="number" placeholder="Age" />
                      </label>
                    </div>
                    <label className="participant__input__tall" htmlFor="city">
                      <input required="required" autoComplete="off" className="form__input" name="city" type="text" placeholder="Ville" />
                    </label>
                    <label className="participant__input__tall" htmlFor="email">
                      <input required="required" autoComplete="off" className="form__input" name="email" type="email" placeholder="E-mail" />
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
                <input type="hidden" name="questionsLength" value={`${questions.length}`} />
              </div>
              {questions.map((question, index) => (
                <div className={`question ${step === index + 1 ? 'step--show' : 'step--hide'}`} key={question.id}>
                  <h2 className="question__title">{question.title}</h2>
                  <div className="upload__image">
                    <label className="upload__image__button" htmlFor={`answerImage${index}`}>
                      {imagePreview ? 'Modifier l\'image' : 'Choisir une image'}
                      <input required="required" className="form__input__file" name={`answerImage${index}`} id={`answerImage${index}`} type="file" onChange={getImagePreview} />
                    </label>
                  </div>
                  {imagePreview
                  && (
                  <div className="preview__wrapper">
                    <img className="image__preview" src={imagePreview} alt="Preview" />
                  </div>
                  )}
                  <label className="comment__answer" htmlFor={`answerComment${index}`}>
                    <textarea className="textarea__answer" name={`answerComment${index}`} rows="10" placeholder="Commentaire.." />
                  </label>
                  <input type="hidden" name={`questionId${index}`} value={`${question.id}`} />
                  <div className="pagination pagination--steps">
                    <div className="buttons__wrapper">
                      <button className="button__steps" type="button" onClick={() => changeStep(-1)}>
                        <i className="button__steps__icon fa fa-caret-left" />
                      </button>
                      <p className="pagination__details">
                        Question
                        {index + 1}
                        /
                        {questions.length}
                      </p>
                      {step < questions.length
                          && (
                          <button className="button__steps" type="button" onClick={() => changeStep(1)}>
                            <i className="button__steps__icon fa fa-caret-right" />
                          </button>
                          )}
                      {step === questions.length
                          && (
                          <button className="submit__button" type="submit">
                            <i className="submit__button__icon fa fa-check" />
                          </button>
                          )}
                    </div>
                  </div>
                </div>
              ))}
            </section>
          )}
      </form>
    </div>
  );
}

export default ParticipationForm;
