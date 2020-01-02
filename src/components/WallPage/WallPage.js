import React, { useState, useEffect } from 'react';
import './WallPage.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function WallPage() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const { questionnaireId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`/api/v1/questionnaires/${questionnaireId}/participations`);
      setQuestions(result.data.questions);
      setAnswers(result.data.answers);
    };
    fetchData();
  }, [questionnaireId]);

  return (
    <div className="WallPage">
      <ul>
        <h2>Questions :</h2>
        {questions.length > 0
              && questions.map((question) => <li key={question.id}>{question.title}</li>)}
      </ul>
      <ul>
        <h2>Réponses :</h2>
        {answers.length > 0
              && answers.map((answer) => <li key={answer.id}>{answer.comment}</li>)}
      </ul>
    </div>
  );
}

export default WallPage;
