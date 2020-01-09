import React, { useState, useEffect } from 'react';
import './WallPage.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function WallPage({ showModal, modalState, isSubmited }) {
  const [questionnaires, setQuestionnaires] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [participantId, setParticipantId] = useState(null);
  const [modalCount, setModalCount] = useState(0);
  const { questionnaireId } = useParams();
  const [filters, setFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`/api/v1/questionnaires/${questionnaireId}/participations${statusFilter ? `?status=${statusFilter}` : ''}${cityFilter ? `?city=${cityFilter}` : ''}`);
      setQuestionnaires(result.data.questionnaires);
      setQuestions(result.data.questions);
      setParticipants(result.data.participants);
    };
    fetchData();
  }, [cityFilter, questionnaireId, statusFilter]);

  const displayModal = (id) => {
    setParticipantId(id);
    showModal(true);
  };

  const closeModal = () => {
    showModal(false);
    setModalCount(0);
  };

  return (
    <div className={modalState ? 'WallPage WallPage--fixe' : 'WallPage'}>
      {isSubmited && (
      <p className="Submit__message">Merci pour votre participation !</p>
      )}
      {questionnaires.length > 0 && (
        <div className="WallPage__presentation">
          <h2 className="WallPage__presentation__title">
            {questionnaires[0].title}
            <Link to={`/questionnaire/${questionnaireId}/participer`} className="WallPage__presentation__button">
              <i className="WallPage__presentation__button__icon fa fa-plus-square" />
              <p className="WallPage__presentation__button__content">Participer</p>
            </Link>
          </h2>
          <p className="WallPage__presentation__content">
            {questionnaires[0].description_consult}
          </p>
        </div>
      )}
      <div className="WallPage__filter">
        <button type="button" onClick={() => setFilters(!filters)} className="WallPage__filter__button">
          <div className="WallPage__filter__title">
            <i className="WallPage__filter__icon fa fa-filter" />
            Filtrer
          </div>
          <i className={filters ? 'fa fa-caret-up' : 'fa fa-caret-down'} />
        </button>
        {filters && (
          <div className="filters__wrapper">
            <input className="filters__input" type="text" value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} placeholder="Ville" />
            <label className="filters__select" htmlFor="status">
              <select className="form__select" name="status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option disabled="disabled" value="">Statut</option>
                <option value="student">Élève/étudiant</option>
                <option value="teacher">Enseignant</option>
                <option value="other">Autre</option>
              </select>
            </label>
          </div>
        )}
      </div>

      <div className="participation">
        {participants.length > 0
          && participants.map((participant) => (
            <div className="participation__wrapper" key={participant.id}>
              <div className="participationInfos">
                <p className="participationInfos__firstname">
                  {participant.firstName}
                </p>
                <p className="participationInfos__lastname">
                  {participant.lastName}
                </p>
                <p className="participationInfos__age">
                  {`${participant.age} ans`}
                </p>
                <p className="participationInfos__city">
                  {participant.city}
                </p>
              </div>
              <div className="participationAnswers">
                {participant.Answers.map((answer, index) => answer.ParticipantId === participant.id
                  && <img key={answer.id} className={`random__image image__${index + 1}--${participant.Answers.length}`} src={answer.image_url} alt="answer path" />)}
                <div className="participationAnswers__button__wrapper">
                  <button type="button" className="participationAnswers__button" onClick={() => displayModal(participant.id)}>
                    <i className="participationAnswers__button__icon fa fa-eye" />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      {participants.map((participant) => participant.id === participantId && (
      <div className={modalState ? 'modal modal--open' : 'modal'} key={participantId + modalCount}>
        <div className="modal__wrapper">
          <button type="button" className="modal__closed__button" onClick={closeModal}>
            <i className="modal__closed__button__icon fa fa-times-circle" />
          </button>
          <div className="modal__question">
            <p>{questions[modalCount].title}</p>
          </div>
          <div className="modal__participantInfos">
            <i className="modal__participantInfos__icon fa fa-user-circle" />
            <p>{`${participant.firstName} ${participant.lastName}`}</p>
          </div>
          <div className="modal__image__wrapper">
            <img className="modal__image" src={participant.Answers[modalCount].image_url} alt="answer path" />
          </div>
          <div className="modal__content__wrapper">
            <p className="modal__comment">{participant.Answers[modalCount].comment}</p>
            <div className="modal__pagination">
              <div className="modal__pagination__wrapper__button">
                {modalCount > 0
                && (
                <button type="button" className="modal__pagination__button" onClick={() => setModalCount(modalCount - 1)}>
                  <i className="fa fa-caret-left" />
                </button>
                )}
              </div>
              <div className="modal__pagination__wrapper__button">
                {modalCount + 1 < participant.Answers.length
                && (
                <button type="button" className="modal__pagination__button" onClick={() => setModalCount(modalCount + 1)}>
                  <i className="fa fa-caret-right" />
                </button>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
      ))}
    </div>
  );
}

export default WallPage;
