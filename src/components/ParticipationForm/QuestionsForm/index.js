import React, { useState, useReducer } from 'react';
import Question from './Question';
import Navigation from './Navigation';
import { initialState, reducer } from '../answersReducer';

const questions = [
  {
    id: 1,
    title: 'Question 1 ?',
    questionnaire_id: 1,
  },
  {
    id: 2,
    title: 'Question 2 ?',
    questionnaire_id: 2,
  },
  {
    id: 3,
    title: 'Question 3 ?',
    questionnaire_id: 3,
  },
];

export default function QuestionsForm() {
  const questionnaireSize = questions.length;
  const [currentPagination, setCurrentPagination] = useState(1);
  const [answer, setAnswer] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState);
  const { answers } = state;

  const changeQuestion = (type) => {
    const action = answers.length < currentPagination ? 'ADD_ANSWER' : 'UPDATE_ANSWER';
    if (type === 'next') {
      dispatch({
        type: action,
        id: currentPagination,
        comment: answer,
        question_id:
          questions[currentPagination - 1].id,
      });
      setCurrentPagination(currentPagination + 1);
    } else {
      setCurrentPagination(currentPagination - 1);
    }
    setAnswer('');
  };

  return (
    <div>
      {currentPagination <= questionnaireSize
        ? (
          <div>
            <Question
              question={questions
                .find((question, index) => index + 1 === currentPagination && question)}
              currentAnswer={setAnswer}
            />
            <Navigation
              allowClick={changeQuestion}
              currentPagination={currentPagination}
              questionnaireSize={questionnaireSize}
            />
          </div>
        )
        : (
          answers.map((item, index) => (
            <div key={item.id}>
              <h3>{questions[index].title}</h3>
              <p>{item.comment}</p>
              <button type="button" onClick={() => setCurrentPagination(index + 1)}>
              edit
              </button>
            </div>
          ))
        )}
    </div>
  );
}
