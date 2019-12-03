import React, { useState } from 'react';
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
  const [comment, getComment] = useState(
    questionnaire.answers[currentQuestion - 1].comment,
  );
  const submitParticipation = (e) => {
    e.preventDefault();
    getParticipation(questionnaire);
  };

  return (
    <div className="ParticipationForm">
      <form onSubmit={(e) => submitParticipation(e)}>
        {questionnaire.questions.map(
          (question) => question.id === currentQuestion && (
          <div key={question.id}>
            {question.title}
            <Uploader />
            <textarea
              onChange={(e) => getComment(
                (questionnaire.answers[currentQuestion - 1].comment = e.target.value),
              )}
              value={questionnaire.answers[currentQuestion - 1].comment}
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
