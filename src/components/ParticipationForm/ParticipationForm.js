import React, { useState, useEffect } from 'react';
import './ParticipationForm.css';
import useLocalStorage from 'react-use-localstorage';
import { useParams } from 'react-router-dom';
import api from '../../api';

window.onload = () => { localStorage.clear(); };

function ParticipationForm({ onClickSubmit }) {
  const [questionnaires, setQuestionnaires] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [step, setStep] = useState(0);
  const [imagePreview, setImagePreview] = useState([]);
  const [comment, setComment] = useLocalStorage(`comment ${step}`, '');
  const { questionnaireId } = useParams();
  // Form
  const [inputFirstName, setInputFirstName] = useState('');
  const [inputLastName, setInputLastName] = useState('');
  const [inputStatus, setInputStatus] = useState('');
  const [inputAge, setInputAge] = useState('');
  const [inputCity, setInputCity] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [formValidate, setFormValidate] = useState(false);
  // Question
  const [questionValidate, setQuestionValidate] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      const result = await api.get(`/api/v1/questionnaires/${questionnaireId}/questions`);
      setQuestions(result.data);
    };
    fetchQuestions();

    const fetchQuestionnaires = async () => {
      const result = await api.get(`/api/v1/questionnaires/${questionnaireId}`);
      setQuestionnaires(result.data);
    };
    fetchQuestionnaires();

    if (inputFirstName && inputLastName && inputStatus && inputAge && inputCity && inputEmail !== '' && inputEmail.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)) {
      setFormValidate(true);
    } else {
      setFormValidate(false);
    }

    if ((imagePreview[step - 1] && imagePreview[step - 1] !== '') && comment !== '') {
      setQuestionValidate(true);
    } else {
      setQuestionValidate(false);
    }
  }, [comment,
    imagePreview,
    inputAge,
    inputCity,
    inputEmail,
    inputFirstName,
    inputLastName,
    inputStatus,
    questionnaireId,
    step]);

  const submitParticipation = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    api.post(`/api/v1/questionnaires/${questionnaireId}/participations`, data);
    onClickSubmit(questionnaireId);
    localStorage.clear();
  };

  const changeStep = (value) => {
    if (step === 0) /* FormParticipation */{
      setStep(step + value);
    } else if (value === -1) /* Arriere */{
      setStep(step + value);
    } else if (value === 1) /* Avant */ {
      setStep(step + value);
    } else {
      console.log('erreur');
    }
    window.scrollTo(0, 0);
  };

  const getImagePreview = (e) => {
    if (e.target.files) {
      if (e.target.files.length !== 0) {
        if (e.target.files[0].type === 'image/jpeg'
          || e.target.files[0].type === 'image/png'
          || e.target.files[0].type === 'image/gif'
        ) {
          const reader = new FileReader();
          reader.readAsDataURL(e.target.files[0]);
          reader.onloadend = (event) => {
            if (imagePreview[step - 1] === undefined) {
              setImagePreview(() => [...imagePreview, event.target.result]);
            } else {
              const newArray = [...imagePreview];
              newArray[step - 1] = event.target.result;
              setImagePreview(newArray);
            }
          };
        } else {
          console.log('Pas de fichier sélectionné');
        }
      }
    } else if (imagePreview[step - 1] === undefined) {
      const newImagePreviewSelect = e.target.value;
      setImagePreview(() => [...imagePreview, newImagePreviewSelect]);
    } else {
      const newArray = [...imagePreview];
      newArray[step - 1] = e.target.value;
      setImagePreview(newArray);
    }
  };

  const deleteImagePreview = () => {
    const newArray = [...imagePreview];
    newArray[step - 1] = '';
    setImagePreview(newArray);
  };

  const baseURL = process.env.REACT_APP_API_URL || '';

  return (
    <div className="ParticipationForm">
      <form
        encType="multipart/formdata"
        onSubmit={submitParticipation}
      >
        {questions.length > 0
          ? (
            <section>
              <div className={`participant ${step < 1 ? 'step--show' : 'step--hide'}`}>
                {questionnaires.length > 0 && (
                <div className="participant__presentation">
                  <h2 className="participant__presentation__title">
                    {questionnaires[0].title}
                  </h2>
                  <p className="participant__presentation__content">
                    {questionnaires[0].participationText}
                  </p>
                </div>
                )}
                <div className="participant__wrapper">
                  <h2 className="participant__handing">
                    <i className="fa fa-caret-down participant__handing__icon" aria-hidden="true" />
                    Formulaire de participation
                  </h2>
                  <div className="participant__wrapper__form">
                    <div className="participant__form__bloc">
                      <label className="participant__input__tall" htmlFor="firstName">
                        <input value={inputFirstName} onChange={(e) => setInputFirstName(e.target.value)} autoComplete="off" className="form__input" name="firstName" type="text" placeholder="Prénom*" />
                      </label>
                      <label className="participant__input__tall" htmlFor="lastName">
                        <input value={inputLastName} onChange={(e) => setInputLastName(e.target.value)} autoComplete="off" className="form__input" name="lastName" type="text" placeholder="Nom*" />
                      </label>
                      <div className="participant__group__inputs">
                        <label defaultValue="" value={inputStatus} onChange={(e) => setInputStatus(e.target.value)} className="participant__select" htmlFor="status">
                          <select className="form__select" name="status" defaultValue="">
                            <option disabled="disabled" value="">Statut*</option>
                            <option value="student">Élève/étudiant</option>
                            <option value="teacher">Enseignant</option>
                            <option value="other">Autre</option>
                          </select>
                        </label>
                        <label className="participant__input__small" htmlFor="age">
                          <input value={inputAge} onChange={(e) => setInputAge(e.target.value)} autoComplete="off" className="form__input" name="age" type="number" placeholder="Age*" />
                        </label>
                      </div>
                    </div>
                    <div className="participant__form__bloc">
                      <label className="participant__input__tall" htmlFor="city">
                        <input value={inputCity} onChange={(e) => setInputCity(e.target.value)} autoComplete="off" className="form__input" name="city" type="text" placeholder="Ville*" />
                      </label>
                      <label className="participant__input__tall" htmlFor="email">
                        <input
                          value={inputEmail}
                          onChange={(e) => setInputEmail(e.target.value)}
                          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                          autoComplete="off"
                          className="form__input"
                          name="email"
                          type="email"
                          placeholder="E-mail*"
                        />
                      </label>
                      <div className="pagination pagination--firststep">
                        <button disabled={!formValidate && 'disabled'} className="participant__button" type="button" onClick={() => changeStep(1)}>Participer*</button>
                      </div>
                    </div>
                  </div>
                  <p className="participant__form__message">
                    {`*En soumettant ce formulaire, j'accepte que les informations saisies soient utilisées pour permettre à Ciclic Centre-Val de Loire, de me recontacter, pour m’envoyer des informations sur ses actions.
                      Conformément au Règlement Général sur la Protection des Données (RGPD), nous vous confirmons que vos données personnelles ne seront en aucun cas délivrées à des tiers.
                      Notre base de données est sécurisée et son contenu ne sera jamais cédé, échangé ou revendu.`}
                  </p>
                </div>
                <input type="hidden" name="questionsLength" value={`${questions.length}`} />
              </div>
              {questions.map((question, index) => (
                <div className={`question ${step === index + 1 ? 'step--show' : 'step--hide'}`} key={question.id}>
                  <h2 className="question__title">{question.title}</h2>
                  {question.uploadFormat ? (
                    <div className="upload__wrapper">
                      <div className="upload__image">
                        {!imagePreview[index] ? (
                          <label className="upload__image__button" htmlFor={`answerImage${index}`}>
                            <i className="upload__button__icon fa fa-plus-square" />
                            {'Ajouter une image'}
                          </label>
                        ) : (
                          <button type="button" className="upload__image__button" onClick={deleteImagePreview}>
                            <i className="upload__button__icon fa fa-trash-o" />
                            {'Supprimer l\'image'}
                          </button>
                        )}
                        <input accept="image/*" required="required" className="form__input__file" name={`answerImage${index}`} id={`answerImage${index}`} type="file" onChange={getImagePreview} />
                      </div>
                      {imagePreview[index] && (
                      <div className="preview__wrapper--mobile">
                        <div className="preview__image">
                          <img src={imagePreview[index]} alt="Preview" className="preview__image__content" />
                        </div>
                      </div>
                      )}
                    </div>
                  ) : (
                    <div className="choice__wrapper">
                      {question.Images.map((image, i) => (
                        <>
                          <input
                            type="radio"
                            name={`answerImageSelect${index}`}
                            id={`answerImageSelect${index}-${i}`}
                            value={baseURL + image.image_url}
                            onChange={getImagePreview}
                            className="choice__input"
                          />
                          <label htmlFor={`answerImageSelect${index}-${i}`} className="choice__answer" key={image.id}>
                            <div className="choice__check" />
                            <i className="fa fa-check-square choice__check__icon" />
                            <img className="choice__image" src={baseURL + image.image_url} alt="choice select" />
                            <p className="choice__title">
                              <i className="fa fa-caret-right choice__title__icon" />
                              {image.title}
                            </p>
                          </label>
                        </>
                      ))}
                    </div>
                  )}
                  <h2 className="participant__handing">
                    <i className="fa fa-caret-down participant__handing__icon" aria-hidden="true" />
                    Ma réponse
                  </h2>
                  <div className="answer__wrapper">
                    <div className="preview__wrapper">
                      <div className="preview__image">
                        {imagePreview[index] ? (
                          <img src={imagePreview[index]} alt="Preview" className="preview__image__content" />
                        ) : (
                          <>
                            <i className="fa fa-camera preview__icon" />
                            <p className="preview__text">Sélectionnez une image ci-dessus.</p>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="comment__wrapper">
                      <label className="comment__answer" htmlFor={`answerComment${index}`}>
                        <textarea onChange={(e) => setComment(e.target.value)} maxLength="400" required="required" className="textarea__answer" name={`answerComment${index}`} rows="10" placeholder="Commentaire..." />
                        <p className="comment__length">
                          {comment.length}
                          /400
                        </p>
                      </label>
                      <input type="hidden" name={`questionId${index}`} value={`${question.id}`} />
                    </div>
                  </div>
                  <div className="pagination pagination--steps">
                    <div className="buttons__wrapper">
                      <button className="button__steps" type="button" onClick={() => changeStep(-1)}>
                        <i className="button__steps__icon fa fa-caret-left" />
                      </button>
                      <p className="pagination__details">
                            Question
                        {' '}
                        {index + 1}
                            /
                        {questions.length}
                      </p>
                      {step < questions.length
                              && (
                              <button disabled={!questionValidate && 'disabled'} className="button__steps" type="button" onClick={() => changeStep(1)}>
                                <i className="button__steps__icon fa fa-caret-right" />
                              </button>
                              )}
                      {step === questions.length
                              && (
                                <button disabled={!questionValidate && 'disabled'} checkvalidation="true" className="submit__button" type="submit">
                                  <i className="submit__button__icon fa fa-check" />
                                </button>
                              )}
                    </div>
                  </div>
                </div>
              ))}
            </section>
          ) : (
            <div className="ParticipationForm__notFound">
              <i className="fa fa-question-circle-o notFound__icon" />
              <p>Aucune question trouvée.</p>
            </div>
          )}
      </form>
    </div>
  );
}

export default ParticipationForm;
