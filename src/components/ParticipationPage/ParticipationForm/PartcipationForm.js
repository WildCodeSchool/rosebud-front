import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import './ParticipationForm.css';
import Uploader from '../Uploader/Uploader';
import FormSteps from '../FormSteps/FormSteps';
import FormPagination from '../FormPagination/FormPagination';


const answersReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      return [...state, action.data];
    case 'UPDATE':
      return state.map((a) => (a.question_id === action.data.question_id ? action.data : a));
    default:
      return state;
  }
};

function ParticipationForm() {
  const [isFetch, setFetch] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [currentId, setCurrentId] = useState('');
  if (isFetch) {
    setCurrentId(questions[0].id);
    setFetch(false);
  }
  const questionnaireSize = questions.length;
  const [commentRender, setComment] = useState('');
  const [idQuestion, setIdQuestion] = useState('');

  const [answers, dispatch] = useReducer(answersReducer, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/v1/questionnaires/1/questions');
      setQuestions(result.data);
      setFetch(true);
    };
    fetchData();
  }, []);

  const submitParticipation = (e) => {
    e.preventDefault();
    axios.post('/api/v1/questionnaires/1/participations', { answers });
  };

  const getParticipation = (value, type) => {
    setCurrentQuestion(currentQuestion + value);
    setCurrentId(currentId + value);
    if (type === 'next') {
      if (answers.length < currentQuestion) {
        dispatch({ type: 'CREATE', data: { comment: commentRender, question_id: idQuestion } });
      } else {
        dispatch({ type: 'UPDATE', data: { comment: commentRender, question_id: idQuestion } });
      }
      setComment(answers.length > currentQuestion ? answers[currentQuestion].comment : '');
    } else {
      setComment(answers[currentQuestion - 2].comment);
    }
  };

  return (
    <div className="ParticipationForm">
      <form onSubmit={submitParticipation}>
        {questions.map(
          (question) => question.id === currentId && (
            <div className="ParticipationForm__step" key={question.id}>
              <h3>{question.title}</h3>
              <Uploader />
              <textarea
                onChange={(e) => {
                  setComment(e.target.value);
                  setIdQuestion(question.id);
                }}
                value={commentRender}
              />
            </div>
          ),
        )}
        <FormSteps
          currentQuestion={currentQuestion}
          questionnaireSize={questionnaireSize}
          changeStep={(value, type) => getParticipation(value, type)}
          allowNext={commentRender}
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
