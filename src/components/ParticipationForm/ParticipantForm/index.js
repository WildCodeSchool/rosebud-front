import React from 'react';
import useLocalStorage from 'react-use-localstorage';

export default function Participant({ addParticipant }) {
  const [firstName, setFirstName] = useLocalStorage('firstname', '');
  const [lastName, setLastName] = useLocalStorage('lastname', '');
  const [status, setStatus] = useLocalStorage('status', '');
  const [city, setCity] = useLocalStorage('city', '');
  const [age, setAge] = useLocalStorage('age', '');
  const [email, setEmail] = useLocalStorage('email', '');

  const handleChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
  };
  const handleChangeCity = (e) => {
    setCity(e.target.value);
  };
  const handleChangeAge = (e) => {
    setAge(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const displayQuestions = () => {
    addParticipant({
      firstName, lastName, city, status,
    });
  };

  return (
    <div>
      <h2>Informations</h2>
      <input
        placeholder="firstname"
        onChange={handleChangeFirstName}
        value={firstName}
      />
      <input
        placeholder="lastname"
        onChange={handleChangeLastName}
        value={lastName}
      />
      <select onChange={handleChangeStatus}>
        <option value="">--votre statut--</option>
        <option value="teacher" selected={status === 'teacher' && 'selected'}>Enseignant</option>
        <option value="student" selected={status === 'student' && 'selected'}>Élève</option>
        <option value="other" selected={status === 'other' && 'selected'}>Autre</option>
      </select>
      <input
        placeholder="City"
        onChange={handleChangeCity}
        value={city}
      />
      <input
        placeholder="Age"
        onChange={handleChangeAge}
        value={age}
      />
      <input
        placeholder="Email"
        onChange={handleChangeEmail}
        value={email}
      />
      <button
        type="button"
        onClick={displayQuestions}
      >
        Participer !
      </button>
    </div>
  );
}
