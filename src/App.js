import React, { useState } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import ParticipationForm from './components/ParticipationForm/ParticipationForm';
import WallPage from './components/WallPage/WallPage';
import Footer from './components/Footer/Footer';

function App() {
  const [modal, setModal] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const [questionnaireId, setQuestionnaireId] = useState(null);

  const showModal = (value) => {
    setModal(value);
  };

  const submitForm = (id) => {
    setQuestionnaireId(id);
    setIsSubmited(true);
    setTimeout(() => { setIsSubmited(false); }, 5000);
  };

  return (
    <div className={modal ? 'App App--fixe' : 'App'}>
      {isSubmited && <Redirect to={`/questionnaire/${questionnaireId}`} />}
      <Header />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/questionnaire/:questionnaireId/participer/">
          <ParticipationForm onClickSubmit={(id) => submitForm(id)} />
        </Route>
        <Route path="/questionnaire/:questionnaireId">
          <WallPage showModal={(value) => showModal(value)} modalState={modal} isSubmited={isSubmited} />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
