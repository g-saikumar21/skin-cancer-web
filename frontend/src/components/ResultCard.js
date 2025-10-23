import React from "react";

function ResultCard({ result }) {
  if (!result) return null;

  const isCancer = result.prediction !== "No Cancer";
  const resultClass = isCancer ? "danger" : "safe";

  return (
    <div className={`result-card ${resultClass}`}>
      <h2>Diagnosis Result</h2>
      <p className="prediction">{result.prediction}</p>
      <p className="confidence">Confidence: {result.confidence}</p>
      <p className="advice">{result.advice}</p>
    </div>
  );
}

export default ResultCard;
