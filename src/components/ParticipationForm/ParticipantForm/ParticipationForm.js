import React from 'react';
import useLocalStorage from 'react-use-localstorage';

function ParticipantForm({ addParticipant }) {
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
      firstName, lastName, city, status, age, email,
    });
  };

  return (
    <div>
      <h2>Informations</h2>
      <label htmlFor="firstname">
        Firstname
        <input
          name="firstname"
          id="firstname"
          placeholder="firstname"
          onChange={handleChangeFirstName}
          value={firstName}
        />

      </label>
      <label htmlFor="lastname">
        Lastname
        <input
          name="lastname"
          id="lastname"
          placeholder="lastname"
          onChange={handleChangeLastName}
          value={lastName}
        />
      </label>
      <label htmlFor="status">
        Status
        <select onChange={handleChangeStatus} value={status}>
          <option value="">--votre statut--</option>
          <option value="teacher">Enseignant</option>
          <option value="student">Élève</option>
          <option value="other">Autre</option>
        </select>
      </label>
      <label htmlFor="city">
        City
        <input
          name="city"
          id="city"
          placeholder="City"
          onChange={handleChangeCity}
          value={city}
        />
      </label>
      <label htmlFor="age">
        Age
        <input
          name="age"
          id="age"
          placeholder="Age"
          onChange={handleChangeAge}
          value={age}
        />
      </label>
      <label htmlFor="email">
        Email
        <input
          name="email"
          id="email"
          placeholder="Email"
          onChange={handleChangeEmail}
          value={email}
        />
      </label>
      <button
        type="button"
        onClick={displayQuestions}
      >
        Participer !
      </button>
    </div>
  );
}

export default ParticipantForm;
