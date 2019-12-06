import React from 'react';

function FormSteps({
  currentQuestion,
  questionnaireSize,
  changeStep,
}) {
  const changeQuestion = (num, type) => () => {
    changeStep(num, type);
  };
  return (
    <div className="FormSteps">
      {currentQuestion > 1 && (
        <button type="button" onClick={changeQuestion(-1, 'prev')}>
          Précédent
        </button>
      )}
      {currentQuestion < questionnaireSize && (
        <button
          type="button"
          onClick={changeQuestion(1, 'next')}
        >
          Suivant
        </button>
      )}
      {currentQuestion === questionnaireSize && (
        <button
          type="submit"
          onClick={changeQuestion(0, 'next')}
        >
          Valider
        </button>
      )}
    </div>
  );
}

export default FormSteps;
