import React from 'react';
import useLocalStorage from 'react-use-localstorage';

export default function Participant({ addParticipant }) {
  const [lastname, setName] = useLocalStorage('name', '');
  const [city, setCity] = useLocalStorage('city', '');

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeCity = (e) => {
    setCity(e.target.value);
  };

  const displayQuestions = () => {
    addParticipant({ lastname, city });
  };

  return (
    <div>
      <h2>Informations</h2>
      <input
        placeholder="name"
        onChange={handleChangeName}
        value={lastname}
      />
      <input
        placeholder="City"
        onChange={handleChangeCity}
        value={city}
      />
      <button
        type="button"
        onClick={displayQuestions}
        disabled={!lastname && !city && 'disabled'}
      >
        Participer !
      </button>
    </div>
  );
}
