'use client';

import styles from './Status.module.css';

import { useState } from 'react';

export default function Status({score, highScore, isGameOver}) {
  const [ displayScore, setDisplayScore ] = useState(score);

  if (displayScore > score) {
    setDisplayScore(score);
  }
  else if (score != displayScore) {
    setTimeout(() => {
      setDisplayScore(displayScore + 1);
    }, 16 + 500 * Math.exp(-0.5*Math.abs(displayScore-score)));
  }

  const gameOverDisplay = (isGameOver) ? 'block' : 'none';
  return (
    <>
      <p style={{display: gameOverDisplay}} className={styles.status}>{isGameOver ? 'Game Over' : <span>&nbsp;</span>}</p>
      <p className={styles.highScore}>High Score: {highScore}</p>
      <p className={styles.score}>{displayScore}</p>
    </>
  );
};