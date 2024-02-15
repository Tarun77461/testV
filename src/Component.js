import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import "./App.css";

const Component = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showForm, setShowForm] = useState(true);
  const [showHappyTheme, setShowHappyTheme] = useState(false);
  const [showSadTheme, setShowSadTheme] = useState(false);
  const [reason, setReason] = useState("");

  const formAnimation = useSpring({
    opacity: showForm ? 1 : 0,
    transform: showForm ? "translateY(0)" : "translateY(-100%)",
  });

  const happyThemeAnimation = useSpring({
    opacity: showHappyTheme ? 1 : 0,
  });

  const handleNextClick = () => {
    if (questionIndex < 2) {
      setQuestionIndex(questionIndex + 1);
    }
  };

  const handlePreviousClick = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    }
  };
  const handleNoClick = () => {
    setShowForm(false);
    setShowSadTheme(true);

    // Create a container for the sad emojis
    const emojiContainer = document.createElement("div");
    emojiContainer.style.position = "fixed";
    emojiContainer.style.top = "0";
    emojiContainer.style.left = "0";
    emojiContainer.style.width = "100%";
    emojiContainer.style.height = "100%";
    emojiContainer.style.overflow = "hidden";
    emojiContainer.style.background = "rgba(0, 0, 0, 0.9)"; // Dark background

    // Append the container to the body
    document.body.appendChild(emojiContainer);

    // Generate and animate multiple sad emojis
    for (let i = 0; i < 100; i++) {
      const emojiType = i % 2 === 0 ? "😢" : "why Dalmi";

      const emoji = document.createElement("div");
      emoji.innerHTML = emojiType;
      emoji.style.position = "absolute";

      // Adjust the fontSize property for resizing the emoji
      emoji.style.fontSize = "2rem"; // You can change this value

      emoji.style.color = "white";
      emoji.style.top = `${Math.random() * 100}vh`;
      emoji.style.left = `${Math.random() * 100}vw`;
      emoji.style.animation = `fall 3s linear`;

      // Append each emoji to the container
      emojiContainer.appendChild(emoji);
    }

    // After 3 seconds, remove the container and reset state
    setTimeout(() => {
      document.body.removeChild(emojiContainer);
      setShowForm(true);
      setShowSadTheme(false);
      setQuestionIndex(0);
    }, 4000);
  };

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const Heart = () => {
    return (
      <div className="heart-container">
        <div className="heart" />
      </div>
    );
  };
  const createHearts = () => {
    const heartContainer = document.getElementById("heart-container");

    heartContainer.innerHTML = "";
    for (let i = 0; i < 100; i++) {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.style.left = `${Math.random() * 100}vw`;
      heart.style.animationDuration = `${Math.random() * 2 + 15}s`;
      heart.style.animationDelay = `-${Math.random() * 2 + 50}s`;
      heartContainer.appendChild(heart);
    }
    if (questionIndex < 2) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setShowForm(false);
      setShowHappyTheme(true);

      setTimeout(() => {
        setShowForm(true);
        setShowHappyTheme(false);
        setQuestionIndex(0);
      }, 3000);
    }
  };

  const sadThemeAnimation = useSpring({
    opacity: showSadTheme ? 1 : 0,
  });

  return (
    <div>
      <div id="heart-container"></div>

      <div className="love-form">
        <animated.div style={formAnimation} className="form-container">
          <h2>Love Form</h2>
          <textarea placeholder={`Question ${questionIndex + 1}`} />
          <div>
            {questionIndex !== 2 && (
              <>
                <button onClick={handlePreviousClick}>Previous</button>
                <button onClick={handleNextClick}>Next</button>
              </>
            )}
            {questionIndex === 2 && (
              <>
                <p>Are you in love?</p>
                <button onClick={createHearts}>Yes</button>
                <button onClick={handleNoClick}>No</button>
              </>
            )}
          </div>
        </animated.div>

        <animated.div style={happyThemeAnimation} className="happy-theme">
          <p>Love is in the air! 💖</p>
          {showHappyTheme && <Heart />}
        </animated.div>

        <animated.div style={sadThemeAnimation} className="sad-theme">
          <p>Oh no! 😢</p>
          <textarea
            placeholder="Please share the reason..."
            value={reason}
            onChange={handleReasonChange}
          />
        </animated.div>
      </div>
    </div>
  );
};

export default Component;
