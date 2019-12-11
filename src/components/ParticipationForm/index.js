import React, { useState } from 'react';
import axios from 'axios';
import ParticipantForm from './ParticipantForm';
import QuestionsForm from './QuestionsForm';

export default function Form() {
  const [participant, setParticipant] = useState(null);
  const [nbQuestions, setNbQuestions] = useState(0);
  const [answers, setAnswers] = useState([]);

  const submitParticipation = (e) => {
    e.preventDefault();
    axios.post('/api/v1/questionnaires/1/participations', { participant, answers });
    localStorage.clear();
  };

  return (
    <form onSubmit={submitParticipation}>
      {!participant
        ? <ParticipantForm addParticipant={setParticipant} />
        : <QuestionsForm addAnswers={setAnswers} nbQuestions={setNbQuestions} />}
      {answers.length === nbQuestions && nbQuestions > 0
        && (
        <button type="submit">
          Send participation
        </button>
        )}
    </form>
  );
}
