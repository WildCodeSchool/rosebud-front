import React from 'react';

function FormSteps({
  currentQuestion,
  questionnaireSize,
  changeStep,
  allowNext,
}) {
  const changeQuestion = (num) => () => {
    changeStep(currentQuestion + num);
  };
  return (
    <div className="FormSteps">
      {currentQuestion > 1 && (
        <button type="button" onClick={changeQuestion(-1)}>
          Précédent
        </button>
      )}
      {currentQuestion < questionnaireSize && (
        <button
          type="button"
          onClick={changeQuestion(1)}
          disabled={!allowNext && 'disabled'}
        >
          Suivant
        </button>
      )}
      {currentQuestion === questionnaireSize && (
        <button type="submit" disabled={!allowNext && 'disabled'}>
          Valider
        </button>
      )}
    </div>
  );
}

export default FormSteps;
