import React from 'react';
import useLocalStorage from 'react-use-localstorage';

export default function Participant({ infosParticipant }) {
  const [name, setName] = useLocalStorage('name', '');
  const [city, setCity] = useLocalStorage('city', '');

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeCity = (e) => {
    setCity(e.target.value);
  };

  const displayQuestions = () => {
    infosParticipant();
  };

  return (
    <div>
      <h2>Informations</h2>
      <input
        placeholder="name"
        onChange={handleChangeName}
        value={name}
      />
      <input
        placeholder="City"
        onChange={handleChangeCity}
        value={city}
      />
      <button type="button" onClick={displayQuestions}>
        Participer !
      </button>
    </div>
  );
}
