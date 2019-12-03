import React, { useState } from 'react';
import ParticipationForm from './ParticipationForm/PartcipationForm';

function ParticipationPage() {
  const [displayParticipation, getParticipation] = useState();
  return (
    <div className="ParticipationPage">
      {!displayParticipation ? (
        <ParticipationForm getParticipation={(data) => getParticipation(data)} />
      ) : (
        <ul>
          {displayParticipation.answers.map((answer) => <li key={answer.id}>{answer.comment}</li>)}
        </ul>
      )}
    </div>
  );
}

export default ParticipationPage;
