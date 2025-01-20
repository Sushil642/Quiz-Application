import React from 'react';

const QuestionOverview = ({ questions, answers, visited }) => {
  return (
    <div className="question-overview">
      <h4>Overview</h4>
      {questions.map((question, index) => (
        <div key={index} className={`overview-item ${visited[index] ? 'visited' : ''}`}>
          <span>Q{index + 1}</span>
          <span>{answers[index] ? 'Attempted' : 'Not Attempted'}</span>
        </div>
      ))}
    </div>
  );
};

export default QuestionOverview;
