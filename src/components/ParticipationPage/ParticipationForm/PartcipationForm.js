import React, { useState } from 'react';
import './ParticipationForm.css';
import Uploader from './Uploader/Uploader';
import FormSteps from './FormSteps/FormSteps';
import FormPagination from './FormPagination/FormPagination';

const questionnaires = {
  id: 1,
};

const questions = [
  {
    id: 1,
    title: 'Lorem ipsum el 1 ?',
    questionnaire_id: 1,
  },
  {
    id: 2,
    title: 'Lorem ipsum el 2 ?',
    questionnaire_id: 1,
  },
  {
    id: 3,
    title: 'Lorem ipsum el 3 ?',
    questionnaire_id: 1,
  },
];

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
];

const questionnaireSize = questions.length;

function ParticipationForm({ getParticipation }) {
  const [currentQuestion, changeQuestion] = useState(1);

  const submitParticipation = (e) => {
    e.preventDefault();
    const data = { questionnaires, questions, answers };
    getParticipation(data);
  };

  const [comment, setComment] = useState(answers[currentQuestion - 1].comment);

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
          questions={questions}
        />
      </form>
    </div>
  );
}

export default ParticipationForm;
