import React, { useState } from 'react';
import Uploader from './Uploader/Uploader';
import FormSteps from './FormSteps/FormSteps';
import FormPagination from './FormPagination/FormPagination';

const questionnaire = [
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
];

const questionnaireSize = questionnaire.length;

function ParticipationForm() {
  const [currentQuestion, changeQuestion] = useState(0);
  return (
    <div className="ParticipationForm">
      <form>
        {questionnaire.map((question) => (
          <div>
            {question.title}
            <Uploader />
            <textarea />
          </div>
        ))}
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
