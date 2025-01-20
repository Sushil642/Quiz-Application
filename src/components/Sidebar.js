import React from 'react';
import './style.css';

const Sidebar = ({ questions, visited, currentQuestionIndex, onNavigate, answers }) => {
  return (
    <div className="sidebar">
      <h3>Questions</h3>
      {questions.map((question, index) => {
        const isAttempted = answers[index] !== undefined;
        const isVisited = visited[index] === true;
        return (
          <div
            key={index}
            className={`question-number ${isAttempted ? 'attempted' : ''} ${isVisited ? 'visited' : ''}`}
            onClick={() => onNavigate(index)}
          >
            {index + 1}
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
