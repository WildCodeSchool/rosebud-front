import React, { useState } from 'react';
import './ParticipationPage.css';
import ParticipationForm from './ParticipationForm/PartcipationForm';

function ParticipationPage() {
  const [displayParticipation, getParticipation] = useState();
  return (
    <div className="ParticipationPage">
      {!displayParticipation ? (
        <ParticipationForm getParticipation={(data) => getParticipation(data)} />
      ) : (
        <ul>
          {displayParticipation.questions.map((question, index) => (
            <li key={question.id}>
              <h3>{question.title}</h3>
              <p>{displayParticipation.answers[index].comment}</p>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ParticipationPage;
