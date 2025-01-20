import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const StartPage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (email) {
      navigate('/quiz');
    } else {
      alert('Please enter a valid email');
    }
  };

  return (
    <div className="flex-center flex-column container">
      <h1>Welcome to the Quiz</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="email-input"
      />
      <button className="primary-btn" onClick={handleSubmit}>
        Start Quiz
      </button>
    </div>
  );
};

export default StartPage;
