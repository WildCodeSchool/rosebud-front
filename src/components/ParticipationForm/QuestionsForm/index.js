import React, { useState, useReducer, useEffect } from 'react';
import axios from 'axios';
import Question from './Question';
import Navigation from './Navigation';
import { initialState, reducer } from '../answersReducer';


export default function QuestionsForm() {
  const [questions, setQuestions] = useState([]);
  const questionnaireSize = questions.length;
  const [currentPagination, setCurrentPagination] = useState(1);
  const [answer, setAnswer] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState);
  const { answers } = state;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/v1/questionnaires/1/questions');
      setQuestions(result.data);
      console.log(result);
    };
    fetchData();
  }, []);

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
              question={questions.filter((index) => (index + 1 === currentPagination))}
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
            <button type="button" onClick={() => setCurrentPagination(index + 1)}>
              {item.comment}
            </button>
          ))
        )}
    </div>
  );
}
