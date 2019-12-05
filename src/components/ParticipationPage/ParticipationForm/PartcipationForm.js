import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ParticipationForm.css';
import Uploader from '../Uploader/Uploader';
import FormSteps from '../FormSteps/FormSteps';
import FormPagination from '../FormPagination/FormPagination';

const answers = [
  {
    comment: '',
    question_id: 1,
  },
  {
    comment: '',
    question_id: 2,
  },
  {
    comment: '',
    question_id: 3,
  },
  {
    comment: '',
    question_id: 4,
  },
  {
    comment: '',
    question_id: 5,
  },
];

function ParticipationForm() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [comment, setComment] = useState(answers[currentQuestion - 1].comment);
  const questionnaireSize = questions.length;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/v1/questionnaires/1');
      setQuestions(result.data);
    };
    fetchData();
  }, []);

  const submitParticipation = (e) => {
    e.preventDefault();
  };

  return (
    <div className="ParticipationForm">
      <form onSubmit={submitParticipation}>
        {questions.map(
          (question, index) => question.id === currentQuestion && (
            <div className="ParticipationForm__step" key={question.id}>
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
          changeStep={setCurrentQuestion}
          allowNext={answers[currentQuestion - 1].comment}
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
