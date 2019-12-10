import React from 'react';
import './App.css';
import ParticipationForm from './components/ParticipationForm';
import ParticipantPage from './components/ParticipantPage/ParticipantPage';

function App() {
  return (
    <div className="App">
      <ParticipationForm />
      <ParticipantPage />
    </div>
  );
}

export default App;
