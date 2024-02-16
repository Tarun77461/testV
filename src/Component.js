import "./test.css";
import React, { useState } from "react";

const Component = () => {
  const [celebrating, setCelebrating] = useState(false);

  const handleCelebrate = () => {
    setCelebrating(true);

    // Reset celebration after a delay (adjust as needed)
    setTimeout(() => {
      setCelebrating(false);
    }, 7000);
  };

  return (
    <div>
      <div className="app">
        <button onClick={handleCelebrate}>Celebrate!</button>
        {celebrating && (
          <div className="celebration-container">
            <div className="hearts-container">
              {Array.from({ length: 50 }, (_, index) => (
                <div key={`heart-${index}`} className="heart"></div>
              ))}
            </div>
            <div className="balloons-container">
              {Array.from({ length: 50 }, (_, index) => (
                <div key={`balloon-${index}`} className="balloon"></div>
              ))}
            </div>
            <div className="thank-you-message">Thank You!</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Component;
