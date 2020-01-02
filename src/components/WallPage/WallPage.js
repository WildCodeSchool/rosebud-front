import React, { useState, useEffect } from 'react';
import './WallPage.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function WallPage() {
  const [participants, setParticipants] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const { questionnaireId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`/api/v1/questionnaires/${questionnaireId}/participations`);
      setQuestions(result.data.questions);
      setParticipants(result.data.participants);
      setAnswers(result.data.answers);
    };
    fetchData();
  }, [questionnaireId]);

  return (
    <div className="WallPage">

      <div className="WallPage__presentation">
        <h2 className="WallPage__presentation__title">
          Classes pilotes Courts métrages / Jeu vidéo
          <button type="button" className="WallPage__presentation__button">
            <i className="WallPage__presentation__button__icon fa fa-plus-square" />
            <p className="WallPage__presentation__button__content">Participer</p>
          </button>
        </h2>
        <p className="WallPage__presentation__content">
                Retrouvez ci-dessous les contributions des élèves des classes pilotes Lycéens
                et apprentis au cinéma 2019/2020 autour du cinéma et des jeux vidéos.
        </p>
      </div>

      <div className="WallPage__filter">
        <p className="WallPage__filter__title">
          <i className="WallPage__filter__icon fa fa-filter" />
                Filtrer
        </p>
        <i className="fa fa-caret-down" />
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
                  {participant.age}
                </p>
                <p className="participationInfos__city">
                  {participant.city}
                </p>
              </div>
              <div className="participationAnswers">
                {answers.map((answer, index) => answer.ParticipantId === participant.id
                  && <img key={answer.id} className={`random__image image__${index + 1}`} src="http://lorempixel.com/640/360/" alt="answer path" />)}
                <div className="participationAnswers__button__wrapper">
                  <button type="button" className="participationAnswers__button">
                    <i className="participationAnswers__button__icon fa fa-eye" />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default WallPage;
