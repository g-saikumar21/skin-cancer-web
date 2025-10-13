import React from "react";
import "./FloatingCells.css";

function FloatingCells() {
  const totalBubbles = 15;
  const totalVirus = 8;

  return (
    <div className="floating-cells">
      {[...Array(totalBubbles)].map((_, idx) => (
        <div key={`bubble-${idx}`} className="cell"></div>
      ))}
      {[...Array(totalVirus)].map((_, idx) => (
        <div key={`virus-${idx}`} className="virus"></div>
      ))}
    </div>
  );
}

export default FloatingCells;
