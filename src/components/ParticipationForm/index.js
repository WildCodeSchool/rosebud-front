import React, { useState } from 'react';
import axios from 'axios';
import ParticipantForm from './ParticipantForm';
import QuestionsForm from './QuestionsForm';

export default function Form() {
  const [participant, setDataParticipant] = useState([]);
  const [answers, setDataAnswers] = useState([]);

  console.log(participant);

  const submitParticipation = (e) => {
    e.preventDefault();
    axios.post('/api/v1/questionnaires/1/participations', { participant, answers });
    localStorage.clear();
  };

  return (
    <form onSubmit={submitParticipation}>
      <ParticipantForm addParticipant={setDataParticipant} />
      <QuestionsForm addAnswers={setDataAnswers} />
      <button type="submit">
          Send participation
      </button>
    </form>
  );
}
