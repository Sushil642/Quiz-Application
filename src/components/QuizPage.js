import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Timer from './Timer';
import './quiz-style.css';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [visited, setVisited] = useState({});
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://opentdb.com/api.php?amount=15').then((response) => {
      const fetchedQuestions = response.data.results.map((q, index) => ({
        ...q,
        id: index,
      }));
      setQuestions(fetchedQuestions);
    });
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft]);

  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    setVisited((prev) => ({ ...prev, [questionId]: true }));
  };

  const handleNavigation = (index) => {
    setCurrentQuestionIndex(index);
    setVisited((prev) => ({ ...prev, [index]: true }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleSubmit = () => {
    navigate('/report', { state: { questions, answers } });
  };

  return (
    <div className="quiz-container flex-row container">
      <Sidebar
        questions={questions}
        visited={visited}
        currentQuestionIndex={currentQuestionIndex}
        onNavigate={handleNavigation}
        answers={answers}
      />
      <div className="main-content">
        <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
        {questions.length > 0 && (
          <div className="question-section">
            <h2 className="quiz-title">Technology Quiz</h2>
            <p className="question-text">
              Question {currentQuestionIndex + 1}: {questions[currentQuestionIndex].question}
            </p>
            <div className="options">
              {[questions[currentQuestionIndex].correct_answer, ...questions[currentQuestionIndex].incorrect_answers]
                .sort()
                .map((option, i) => (
                  <label key={i} className="option-label">
                    <input
                      type="radio"
                      name={`question-${currentQuestionIndex}`}
                      value={option}
                      onChange={() => handleAnswer(currentQuestionIndex, option)}
                      checked={answers[currentQuestionIndex] === option}
                    />
                    {option}
                  </label>
                ))}
            </div>
          </div>
        )}
        <div className="navigation">
          <span>{currentQuestionIndex + 1} of {questions.length} Questions</span>
          {currentQuestionIndex < questions.length - 1 ? (
            <button className="primary-btn" onClick={handleNext}>Next</button>
          ) : (
            <button className="primary-btn" onClick={handleSubmit}>Submit Quiz</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
