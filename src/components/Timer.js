import React, { useEffect } from 'react';
import './timer-style.css'; // Include custom CSS for the timer

const Timer = ({ timeLeft, setTimeLeft }) => {
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, setTimeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const percentage = (timeLeft / (30 * 60)) * 100; // Calculate percentage for 30 minutes

  return (
    <div className="timer-container">
      <div className="circular-timer">
        <svg className="progress-ring" width="120" height="120">
          <circle
            className="progress-ring__circle"
            cx="60"
            cy="60"
            r="50"
            strokeDasharray="314"
            strokeDashoffset={`${314 - (percentage / 100) * 314}`}
          />
        </svg>
        <div className="timer-text">
          {minutes}:{seconds.toString().padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};

export default Timer;
