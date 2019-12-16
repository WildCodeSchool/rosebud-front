import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import ParticipationForm from './components/ParticipationForm/ParticipationForm';


function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/participation/questionnaire/:questionnaireId">
          <ParticipationForm />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
