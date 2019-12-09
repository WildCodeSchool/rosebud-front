import React, { useEffect } from 'react';
import useLocalStorage from 'react-use-localstorage';

export default function Question({ question, currentAnswer }) {
  const { id, title } = question;
  const [localAnswer, setLocalAnswer] = useLocalStorage(`answer ${id}`, '');
  const handleChange = (e) => {
    setLocalAnswer(e.target.value);
    currentAnswer(e.target.value);
  };

  useEffect(() => {
    currentAnswer(localStorage.getItem(`answer ${id}`));
  });

  return (
    <div>
      <h2>{title}</h2>
      <input type="text" onChange={handleChange} value={localAnswer} />
    </div>
  );
}
