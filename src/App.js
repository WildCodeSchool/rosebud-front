import React, { useState } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import ParticipationForm from './components/ParticipationForm/ParticipationForm';
import WallPage from './components/WallPage/WallPage';
import Footer from './components/Footer/Footer';

function App() {
  const [modal, setModal] = useState(false);

  const showModal = (value) => {
    setModal(value);
  };

  return (
    <div className={modal ? 'App App--fixe' : 'App'}>
      <Header />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/questionnaire/:questionnaireId/participer/">
          <ParticipationForm />
        </Route>
        <Route path="/questionnaire/:questionnaireId">
          <WallPage showModal={(value) => showModal(value)} modalState={modal} />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
