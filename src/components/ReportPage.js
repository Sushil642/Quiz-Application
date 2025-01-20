import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './report-style.css'; // Include your custom styles

const ReportPage = () => {
  const { state } = useLocation();
  const { questions, answers } = state;

  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);

  const totalQuestions = questions.length;
  const correctAnswers = questions.filter(
    (q, index) => answers[index] === q.correct_answer
  ).length;
  const incorrectAnswers = totalQuestions - correctAnswers;

  const correctPercentage = Math.round((correctAnswers / totalQuestions) * 100);

  const toggleCorrectAnswers = () => {
    setShowCorrectAnswers((prev) => !prev);
  };

  return (
    <div className="report-page">
      <div className="report-header">
        <h1 className="username">Quiz Report</h1>
        <div className="score-circle">
          <div className="score-percentage">{correctPercentage}%</div>
        </div>
        <div className="details">
          <p>
            Points: {correctAnswers} / {totalQuestions}
          </p>
          <p>Duration: Approx. 7 mins</p>
        </div>
      </div>

      <div className="categories">
        <h3>Categories</h3>
        <div className="category-item">
          <span>Correct</span>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${correctPercentage}%` }}
            ></div>
          </div>
          <span>{correctPercentage}%</span>
        </div>
        <div className="category-item">
          <span>Incorrect</span>
          <div className="progress-bar">
            <div
              className="progress-fill incorrect"
              style={{ width: `${100 - correctPercentage}%` }}
            ></div>
          </div>
          <span>{100 - correctPercentage}%</span>
        </div>
      </div>

      <div className="answers-summary">
        <h3>Answers</h3>
        <div className="answers-row">
          <div>
            <h4>Correct</h4>
            <p>{correctAnswers}</p>
          </div>
          <div>
            <h4>Incorrect</h4>
            <p>{incorrectAnswers}</p>
          </div>
          <div>
            <h4>Total</h4>
            <p>{totalQuestions}</p>
          </div>
        </div>
      </div>

      <button className="toggle-btn" onClick={toggleCorrectAnswers}>
        {showCorrectAnswers ? 'Hide Correct Answers' : 'Show Correct Answers'}
      </button>

      {showCorrectAnswers && (
        <div className="correct-answers">
          <h3>Correct Answers</h3>
          {questions.map((question, index) => (
            <div key={index} className="answer-item">
              <p>
                <strong>Q{index + 1}:</strong> {question.question}
              </p>
              <p>
                <strong>Correct Answer:</strong> {question.correct_answer}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportPage;
