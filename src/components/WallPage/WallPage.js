import React from 'react';
import './WallPage.css';
import Participation from './Participation/Participation';

function WallPage() {
  return (
    <div className="WallPage">
      <Participation />
      <Participation />
      <Participation />
      <Participation />
    </div>
  );
}

export default WallPage;
