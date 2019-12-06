import React from 'react';
import './App.css';
import ParticipationPage from './components/ParticipationPage/ParticipationPage';
import WallPage from './components/WallPage/WallPage';

function App() {
  return (
    <div className="App">
      <ParticipationPage />
      <WallPage />
    </div>
  );
}

export default App;
