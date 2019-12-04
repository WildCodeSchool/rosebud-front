import React, { useState } from 'react';
import './ParticipationForm.css';
import Uploader from './Uploader/Uploader';
import FormSteps from './FormSteps/FormSteps';
import FormPagination from './FormPagination/FormPagination';

const questionnaire = {
  id: 1,
  questions: [
    {
      id: 1,
      title: 'Lorem ipsum el 1 ?',
    },
    {
      id: 2,
      title: 'Lorem ipsum el 2 ?',
    },
    {
      id: 3,
      title: 'Lorem ipsum el 3 ?',
    },
  ],
  answers: [
    {
      id: 1,
      comment: '',
    },
    {
      id: 2,
      comment: '',
    },
    {
      id: 3,
      comment: '',
    },
  ],
};

const questionnaireSize = questionnaire.questions.length;

function ParticipationForm({ getParticipation }) {
  const [currentQuestion, changeQuestion] = useState(1);

  const submitParticipation = (e) => {
    e.preventDefault();
    getParticipation(questionnaire);
  };

  const [comment, setComment] = useState(
    questionnaire.answers[currentQuestion - 1].comment,
  );

  return (
    <div className="ParticipationForm">
      <form onSubmit={(e) => submitParticipation(e)}>
        {questionnaire.questions.map(
          (question, index) => question.id === currentQuestion && (
          <div className="question__step" key={question.id}>
            <h3>{question.title}</h3>
            <Uploader />
            <textarea
              rows="6"
              onChange={(e) => {
                questionnaire.answers[index].comment = e.target.value;
                setComment(e.target.value);
              }}
              value={
                    comment === questionnaire.answers[index].comment
                      ? comment
                      : questionnaire.answers[index].comment
                  }
            />
          </div>
          ),
        )}
        <FormSteps
          currentQuestion={currentQuestion}
          questionnaireSize={questionnaireSize}
          changeStep={(step) => changeQuestion(step)}
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
