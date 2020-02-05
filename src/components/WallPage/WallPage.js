import React, { useState, useEffect } from 'react';
import './WallPage.css';
import { Link, useParams, Redirect } from 'react-router-dom';
import api from '../../api';

import loading from './loading/loader150px.gif';

const itemPerScroll = 7;

function WallPage({ showModal, modalState, isSubmited }) {
  const [questionnaires, setQuestionnaires] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [participantId, setParticipantId] = useState(null);
  const [modalCount, setModalCount] = useState(0);
  const [participantsCounter, setParticipantsCounter] = useState(0);
  const [loader, setLoader] = useState(true);
  // REQ PARAMS
  const { questionnaireId } = useParams();
  // REQ QUERY
  const [filters, setFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState(null);
  const [cityFilter, setCityFilter] = useState(null);
  const [nameFilter, setNameFilter] = useState(null);
  // Pagination
  const [limit, setLimit] = useState(itemPerScroll);

  useEffect(() => {
    const fetchParticipations = async () => {
      const result = await api.get(`/api/v1/questionnaires/${questionnaireId}/participations?limit=${limit}&offset=0${statusFilter ? `&status=${statusFilter}` : '&status=all'}${cityFilter ? `&city=${cityFilter}` : '&city=all'}${nameFilter ? `&name=${nameFilter}` : '&name=all'}`);
      setQuestions(result.data.questions);
      setParticipants(result.data.participants);
      setTimeout(() => {
        setLoader(false);
      }, 1800);
    };
    fetchParticipations();

    const fetchParticipantsCounter = async () => {
      if (questionnaireId) {
        const result = await api.get(`/api/v1/metrics/participants/${questionnaireId}`);
        setParticipantsCounter(result.data);
      }
    };
    fetchParticipantsCounter();

    const fetchQuestionnaire = async () => {
      if (questionnaireId) {
        const result = await api.get(`/api/v1/questionnaires/${questionnaireId}`);
        setQuestionnaires(result.data);
      }
    };
    fetchQuestionnaire();
  }, [cityFilter,
    limit,
    loader,
    nameFilter,
    participants.length,
    participantsCounter,
    questionnaireId,
    questionnaires.length,
    statusFilter]);


  window.onscroll = () => {
    if (participants.length < participantsCounter) {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
        setLimit(participants.length + itemPerScroll);
      }
    }
  };

  console.log(participants.length, participantsCounter, limit, nameFilter, cityFilter, statusFilter);

  const displayModal = (id) => {
    setParticipantId(id);
    showModal(true);
  };

  const closeModal = () => {
    showModal(false);
    setModalCount(0);
  };

  const isLoading = (load) => {
    if (participants.length >= 0 && !load) {
      return false;
    }
    return true;
  };

  const baseURL = process.env.REACT_APP_API_URL || '';

  return (
    questionnaires.length > 0 && (
      questionnaires[0].isOnline ? (
        <div className={modalState ? 'WallPage WallPage--fixe' : 'WallPage'}>
          {isSubmited && (
            <p className="Submit__message">Merci pour votre participation !</p>
          )}
          {questionnaires.length > 0 && (
            <div className="WallPage__presentation">
              <h2 className="WallPage__presentation__title">
                {questionnaires[0].title}
                {questions.length > 0 && (
                  <Link to={`/questionnaire/${questionnaireId}/participer`} className="WallPage__presentation__button">
                    <i className="WallPage__presentation__button__icon fa fa-plus-square" />
                    <p className="WallPage__presentation__button__content">Participer</p>
                  </Link>
                )}
              </h2>
              <p className="WallPage__presentation__content">
                {questionnaires[0].presentationText}
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
                <input
                  className="filters__input"
                  type="text"
                  placeholder="Nom de famille"
                  value={nameFilter}
                  onChange={(e) => {
                    setNameFilter(e.target.value);
                    setParticipants([]);
                    setParticipantsCounter(0);
                    setLimit(itemPerScroll);
                    setLoader(true);
                  }}
                />
                <input
                  className="filters__input"
                  type="text"
                  value={cityFilter}
                  placeholder="Ville"
                  onChange={(e) => {
                    setCityFilter(e.target.value);
                    setParticipants([]);
                    setParticipantsCounter(0);
                    setLimit(itemPerScroll);
                    setLoader(true);
                  }}
                />
                <label className="filters__select" htmlFor="status">
                  <select
                    className="form__select"
                    name="status"
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setParticipants([]);
                      setParticipantsCounter(0);
                      setLimit(itemPerScroll);
                      setLoader(true);
                    }}
                  >
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
            {questions.length > 0 && (
              <div className="wallpage__questions__title">
                <div className="wallpage__question__space">
                  <i className="fa fa-comments wallpage__question__icon" />
                </div>
                <div className={`wallpage__questions__wrapper wallpage__questions__wrapper__${questions.length}`}>
                  {questions.map((question, index) => (
                    <div className="wallpage__question">
                      <div className="wallpage__question__number__wrapper" />
                      <div className="wallpage__question__number">{index + 1}</div>
                      {question.title}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {isLoading(loader) && (
              <div className="loader__wrapper__wallpage">
                <img src={loading} className="loader__image" alt="loader" />
              </div>
            )}
            {!isLoading(loader) && (
              <>
                {participants.length > 0 ? (participants.map((participant) => (
                  participant.isApproved ? (
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
                      <div className={`participationAnswers participationAnswers__${participant.Answers.length}`}>
                        {participant.Answers
                          .map((answer, index) => answer.ParticipantId === participant.id && (
                            <div className={`flip-card flip-card__${index + 1}--${participant.Answers.length}`}>
                              <div className="flip-card-inner">
                                <div className="flip-card-front">
                                  <img
                                    key={answer.id}
                                    className="wallpage__random__image"
                                    src={answer.image_url.includes(baseURL)
                                      ? answer.image_url
                                      : baseURL + answer.image_url}
                                    alt="answer path"
                                  />
                                </div>
                                <p className="flip-card-back">
                                  <i className="fa fa-quote-left answer__quote__left" />
                                  {answer.comment}
                                </p>
                              </div>
                            </div>
                          ))}
                        <div className="participationAnswers__button__wrapper">
                          <button type="button" className="participationAnswers__button" onClick={() => displayModal(participant.id)}>
                            <i className="participationAnswers__button__icon fa fa-eye" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="WallPage__notFound">
                      <i className="fa fa-question-circle-o notFound__icon" />
                      <p>Aucune participation trouvée.</p>
                    </div>
                  )
                ))
                ) : (
                  <div className="WallPage__notFound">
                    <i className="fa fa-question-circle-o notFound__icon" />
                    <p>Aucune participation trouvée.</p>
                  </div>
                )}
              </>
            )}
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
                  <img className="modal__image" src={baseURL + participant.Answers[modalCount].image_url} alt="answer path" />
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
      ) : (
        <Redirect to="/" />
      )
    )
  );
}

export default WallPage;
