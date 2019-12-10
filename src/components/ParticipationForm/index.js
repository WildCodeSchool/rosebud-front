import React from 'react';
import ParticipantForm from './ParticipantForm';
import QuestionsForm from './QuestionsForm';

export default function Form() {
  const submitParticipation = () => {
    localStorage.clear();
  };
  return (
    <form onSubmit={submitParticipation}>
      <ParticipantForm />
      <QuestionsForm />
      <br />
      <button type="submit">
                Send participation
      </button>
    </form>
  );
}
