import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import jsPDF from "jspdf";
import "./App.css";
import sample from "./assets/panda.mp4";
const Component = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showForm, setShowForm] = useState(true);
  // const [showHappyTheme, setShowHappyTheme] = useState(false);
  const [showSadTheme, setShowSadTheme] = useState(false);
  const [reason, setReason] = useState("");
  const storedFormData = JSON.parse(localStorage.getItem("formData")) || [
    "",
    "",
    "",
  ];
  const [formData, setFormData] = useState(storedFormData);

  const formAnimation = useSpring({
    opacity: showForm ? 1 : 0,
    transform: showForm ? "translateY(0)" : "translateY(-100%)",
  });

  // const happyThemeAnimation = useSpring({
  //   opacity: showHappyTheme ? 1 : 0,
  // });

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
    setFormData((prevData) => {
      const newData = [...prevData];
      newData[questionIndex] = reason;
      return newData;
    });
    console.log("Form Data:", formData);
    saveFormDataToLocal();

    if (questionIndex < 2) {
      setQuestionIndex(questionIndex + 1);
    }

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
    emojiContainer.style.background = "rgba(0, 0, 0, 0.9)";
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
      saveDataToPDF();
    }, 4000);
  };

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const saveDataToPDF = () => {
    const pdf = new jsPDF();
    pdf.text("Form Data", 20, 10);
    pdf.text(`Question 1 (How are you Dalmi?) answer: ${formData[0]}`, 20, 20);
    pdf.text(
      `Question 2 (  Do you believe in everlasting love?) answer: ${formData[1]}`,
      20,
      30
    );
    pdf.text(
      `Question 3 (  So seriously wala question will you be my valentine interval nhi
      end tak ??? reason jarur mention krna jo bhi decision ho) answer: ${formData[2]}`,
      20,
      40
    );

    // Save the PDF
    pdf.save("formData.pdf");
  };

  const createHearts = () => {
    // Check if "Yes" button was clicked
    if (questionIndex === 2) {
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

      // Additional logic for transitioning to the next state or resetting the form
      if (questionIndex < 2) {
        setQuestionIndex(questionIndex + 1);
      } else {
        setShowForm(false);
        // setShowHappyTheme(true);
        setTimeout(() => {
          setShowForm(true);
          // setShowHappyTheme(false);
          setQuestionIndex(0);
          saveFormDataToLocal();
          saveDataToPDF();
        }, 3000);
      }
    }
  };

  const sadThemeAnimation = useSpring({
    opacity: showSadTheme ? 1 : 0,
  });
  const saveFormDataToLocal = () => {
    // localStorage.setItem("formData", JSON.stringify(formData));
  };

  return (
    <div>
      <div className="full-screen-container">
        <div id="heart-container"></div>

        <div className="love-form">
          <div className="video-container">
            <video className="videoTag" autoPlay loop muted>
              <source src={sample} type="video/mp4" />
            </video>
          </div>
          <animated.div style={formAnimation} className="form-container">
            <h2>This form made only for you dalmi &#10084;</h2>

            {questionIndex === 0 && (
              <>
                <label htmlFor="question1">Q.1 How are you Dalmi?</label>
                <input
                  type="text"
                  id="question1"
                  placeholder={`Please enter your answer ${questionIndex + 1}`}
                  value={formData[questionIndex]}
                  onChange={(e) =>
                    setFormData([e.target.value, formData[1], formData[2]])
                  }
                />
              </>
            )}

            {questionIndex === 1 && (
              <>
                <label htmlFor="question2">
                  Q.2 Do you believe in everlasting love?
                </label>
                <input
                  type="text"
                  id="question2"
                  placeholder={`Please enter your answer ${questionIndex + 1}`}
                  value={formData[questionIndex]}
                  onChange={(e) =>
                    setFormData([formData[0], e.target.value, formData[2]])
                  }
                />
              </>
            )}

            {questionIndex === 2 && (
              <>
                <label htmlFor="question3">
                  Q.3 So seriously wala question will you be my valentine
                  interval nhi end tak ??? reason jarur mention krna jo bhi
                  decision ho
                </label>
                <input
                  type="text"
                  id="question3"
                  placeholder={`Please enter your answer ${questionIndex + 1}`}
                  value={formData[questionIndex]}
                  onChange={(e) =>
                    setFormData([formData[0], formData[1], e.target.value])
                  }
                />
              </>
            )}

            <div>
              {questionIndex !== 2 && (
                <>
                  <button onClick={handlePreviousClick}>Previous</button>
                  <button onClick={handleNextClick}>Next</button>
                </>
              )}

              {questionIndex === 2 && (
                <>
                  <button onClick={createHearts}>Yes</button>
                  <button onClick={handleNoClick}>No</button>
                </>
              )}
            </div>
          </animated.div>
          <div id="pink-blue-screen" className="pink-blue-screen">
            <animated.div style={sadThemeAnimation} className="sad-theme">
              <p>Thank you so much! &#10084;</p>
            </animated.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Component;
