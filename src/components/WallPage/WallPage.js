import React from "react";
import './WallPage.css';
import Participation from "./Participation/Participation";

const WallPage = () => {
  return (
    <div className="wallpage__content">
      <Participation />
      <Participation />
      <Participation />
      <Participation />
    </div>
  );
};

export default WallPage;
