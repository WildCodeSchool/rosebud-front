import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ParticipationForm.css';
import Uploader from './Uploader/Uploader';
import FormSteps from './FormSteps/FormSteps';
import FormPagination from './FormPagination/FormPagination';

const questionnaires = {
  id: 1,
};

const answers = [
  {
    id: 1,
    comment: '',
    question_id: 1,
  },
  {
    id: 2,
    comment: '',
    question_id: 2,
  },
  {
    id: 3,
    comment: '',
    question_id: 3,
  },
  {
    id: 4,
    comment: '',
    question_id: 4,
  },
  {
    id: 5,
    comment: '',
    question_id: 5,
  },
];

function ParticipationForm({ getParticipation }) {
  const [questions, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/v1/questionnaires/1');
      setData(result.data);
    };
    fetchData();
  }, []);

  const [currentQuestion, changeQuestion] = useState(1);

  const submitParticipation = (e) => {
    e.preventDefault();
    const data = { questionnaires, questions, answers };
    getParticipation(data);
  };

  const [comment, setComment] = useState(answers[currentQuestion - 1].comment);

  const questionnaireSize = questions.length;

  return (
    <div className="ParticipationForm">
      <form onSubmit={(e) => submitParticipation(e)}>
        {questions.map(
          (question, index) => question.id === currentQuestion && (
          <div className="question__step" key={question.id}>
            <h3>{question.title}</h3>
            <Uploader />
            <textarea
              onChange={(e) => {
                answers[index].comment = e.target.value;
                setComment(e.target.value);
              }}
              value={
                    comment === answers[index].comment
                      ? comment
                      : answers[index].comment
                  }
            />
          </div>
          ),
        )}
        <FormSteps
          currentQuestion={currentQuestion}
          questionnaireSize={questionnaireSize}
          changeStep={(step) => changeQuestion(step)}
          stateButton={answers[currentQuestion - 1].comment}
        />
        <FormPagination
          currentQuestion={currentQuestion}
          questionnaireSize={questionnaireSize}
        />
      </form>
    </div>
  );
}

export default ParticipationForm;
