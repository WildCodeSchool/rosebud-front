import React, { useState } from 'react';
import axios from 'axios';
import ParticipantForm from './ParticipantForm';
import QuestionsForm from './QuestionsForm';

export default function Form() {
  const [dataParticipant, setDataParticipant] = useState(null);
  const [nbQuestions, setNbQuestions] = useState(0);
  const [dataAnswers, setDataAnswers] = useState([]);

  const submitParticipation = (e) => {
    e.preventDefault();
    axios.post('/api/v1/questionnaires/1/participations', { dataParticipant, dataAnswers });
    localStorage.clear();
  };

  return (
    <form onSubmit={submitParticipation}>
      {!dataParticipant
        ? <ParticipantForm addParticipant={setDataParticipant} />
        : <QuestionsForm addAnswers={setDataAnswers} nbQuestions={setNbQuestions} />}
      {dataAnswers.length === nbQuestions && nbQuestions > 0
        && (
        <button type="submit">
          Send participation
        </button>
        )}
    </form>
  );
}
