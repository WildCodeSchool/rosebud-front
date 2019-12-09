import React, { useState } from 'react';
import ParticipantForm from './ParticipantForm';
import QuestionsForm from './QuestionsForm';

export default function Form() {
  const [dataParticipation, setDataParticipant] = useState([]);
  const [dataAnswers, setDataAnswers] = useState([]);

  console.log(dataParticipation);
  console.log(dataAnswers);

  const submitParticipation = () => {
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
