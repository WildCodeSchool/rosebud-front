import React, { useState } from 'react';
import axios from 'axios';
import ParticipantForm from './ParticipantForm/ParticipationForm';
import QuestionsForm from './QuestionsForm/QuestionForm';

function ParticipationForm() {
  const [participant, setParticipant] = useState(null);
  const [questionsLength, setQuestionsLength] = useState(0);
  const [answers, setAnswers] = useState([]);

  const submitParticipation = (e) => {
    e.preventDefault();
    axios.post('/api/v1/questionnaires/1/participations', { participant, answers });
    localStorage.clear();
  };

  console.log(answers);

  return (
    <form onSubmit={submitParticipation}>
      {!participant
        ? <ParticipantForm addParticipant={setParticipant} />
        : <QuestionsForm addAnswers={setAnswers} setQuestionsLength={setQuestionsLength} />}
      {answers.length === questionsLength && questionsLength > 0
        && (
          <button type="submit">
            Send participation
          </button>
        )}
    </form>
  );
}

export default ParticipationForm;
