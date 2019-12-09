import React from 'react';
import axios from 'axios';
import ParticipantForm from './ParticipantForm';
import QuestionsForm from './QuestionsForm';

export default function Form() {
  const submitParticipation = () => {
    axios({
      method: 'post',
      url: '/api/v1/questionnaires/1/participations',
      data: [],
    })
      .then((reponse) => {
        // On traite la suite une fois la réponse obtenue
        console.log(reponse);
      })
      .catch((erreur) => {
      // On traite ici les erreurs éventuellement survenues
        console.log(erreur);
      });

    localStorage.clear();
  };

  return (
    <form onSubmit={submitParticipation}>
      <ParticipantForm />
      <QuestionsForm />
      <button type="submit">
          Send participation
      </button>
    </form>
  );
}
