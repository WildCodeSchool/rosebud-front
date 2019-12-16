import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="HomePage">
      <p>Home</p>
      <Link to="/participation/questionnaire/1">Questionnaire 1</Link>
    </div>
  );
}

export default HomePage;
