import React from "react";

function ResultCard({ result }) {
  const isCancer = result !== "No Cancer";

  return (
    <div className={`result-card ${isCancer ? "danger" : "safe"}`}>
      <h2>Result</h2>
      <p className="prediction">{result}</p>
      {isCancer && <p className="advice">⚠️ Please consult a dermatologist immediately.</p>}
      {!isCancer && <p className="advice">✅ No cancer detected. Keep monitoring your skin regularly.</p>}
    </div>
  );
}

export default ResultCard;
