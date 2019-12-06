import React from 'react';
import './FormPagination.css';

function FormPagination({ currentQuestion, questions }) {
  return (
    <>
      <ol className="tunnel">
        {questions.map((question) => <li key={question.id} className={question.id === currentQuestion ? 'is-current' : ''} />)}
      </ol>
    </>
  );
}

export default FormPagination;
