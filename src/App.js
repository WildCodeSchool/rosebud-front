import React from 'react';
import './App.css';
import ParticipationForm from './components/ParticipationForm';
import UploadImage from './components/ParticipationForm/QuestionsForm/Question/UploadImage/UploadImage';

function App() {
  return (
    <div className="App">
      <ParticipationForm />
      <UploadImage />
    </div>
  );
}

export default App;
