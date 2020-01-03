import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import ParticipationForm from './components/ParticipationForm/ParticipationForm';
import WallPage from './components/WallPage/WallPage';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/questionnaire/:questionnaireId/participer/">
          <ParticipationForm />
        </Route>
        <Route path="/questionnaire/:questionnaireId/consulter/">
          <WallPage />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
