import React from 'react';
import './FormPagination.css';

const FormPagination = ({ currentQuestion, questionnaireSize, questions }) => (
  <>
    <ol className="tunnel">
      {questions.map((question) => <li className={question.id === currentQuestion && 'is-current'} />)}
      {console.log(currentQuestion)}
    </ol>

  </>
);

export default FormPagination;
