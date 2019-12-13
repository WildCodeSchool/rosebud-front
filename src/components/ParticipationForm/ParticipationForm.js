import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ParticipationForm() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/v1/questionnaires/1/questions');
      setQuestions(result.data);
    };
    fetchData();
  }, []);

  const formSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    axios.post('/api/v1/questionnaires/1/participations', data);
  };

  return (
    <form
      action="/upload"
      method="POST"
      encType="multipart/formdata"
      onSubmit={formSubmit}
    >
      <div className="step">
        <label htmlFor="firstName">
          <input name="firstName" type="text" placeholder="Prénom" />
        </label>
        <label htmlFor="lastname">
          <input name="lastname" type="text" placeholder="Nom" />
        </label>
        <label htmlFor="status">
          <input name="status" type="text" placeholder="Status" />
        </label>
        <label htmlFor="age">
          <input name="age" type="text" placeholder="Age" />
        </label>
        <label htmlFor="city">
          <input name="city" type="text" placeholder="Ville" />
        </label>
        <label htmlFor="email">
          <input name="email" type="text" placeholder="E-mail" />
        </label>
      </div>
      {
        questions.map((question, index) => (
          <div className="step" key={question.id}>
            <h3>{question.title}</h3>
            <label htmlFor={`answer-${index}-image`}>
              <input name={`answer-${index}-image`} type="file" />
            </label>
            <label htmlFor={`answer-${index}-comment`}>
              <textarea name={`answer-${index}-comment`} cols="30" rows="10" />
            </label>
          </div>
        ))
      }
      <button type="submit">
        Envoyer
      </button>
    </form>
  );
}

export default ParticipationForm;
