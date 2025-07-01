import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState(1500); // 25分（1500秒）
  const [isRunning, setIsRunning] = useState(false);
  const [session, setSession] = useState('work'); // 'work' or 'break'

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            // セッションの切り替え
            if (session === 'work') {
              setSession('break');
              return 300; // 5分の休憩
            } else {
              setSession('work');
              return 1500; // 25分の作業
            }
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, session]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(session === 'work' ? 1500 : 300);
  };

  return (
    <div className="app">
      <h1>ポモドーロタイマー</h1>
      <div className="timer-container">
        <div className="time-display">
          <h2>{formatTime(time)}</h2>
          <p>{session === 'work' ? '作業中' : '休憩中'}</p>
        </div>
        <div className="controls">
          <button onClick={startTimer} disabled={isRunning}>
            開始
          </button>
          <button onClick={stopTimer} disabled={!isRunning}>
            停止
          </button>
          <button onClick={resetTimer}>
            リセット
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
