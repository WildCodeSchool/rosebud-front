import React from 'react';
import useLocalStorage from 'react-use-localstorage';

export default function Participant() {
  const [name, setName] = useLocalStorage('name', '');
  const [city, setCity] = useLocalStorage('city', '');

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeCity = (e) => {
    setCity(e.target.value);
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
      <h1>
        {name && `Hello, ${name}`}
        {city && ` from ${city}`}
      </h1>
    </div>
  );
}
