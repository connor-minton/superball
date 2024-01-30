'use client';

import styles from './Status.module.css';

import { useState, useEffect } from 'react';

export default function Status({score, highScore, isGameOver, glowHighScore}) {
  const [ displayScore, setDisplayScore ] = useState(score);

  useEffect(() => {
    if (score > displayScore) {
      // This code animates the score counter so that the number counts up rapidly
      setTimeout(() => {
        // Increase displayScore by more if score is farther from displayScore.
        let newDisplayScore = Math.floor(displayScore + Math.pow(Math.abs(displayScore - score), 0.20));
        if ((newDisplayScore - displayScore) % 10 === 5 || (newDisplayScore - displayScore) % 10 === 0)
          newDisplayScore--;
        else if (newDisplayScore === displayScore)
          newDisplayScore++; // always increase by at least one
        setDisplayScore(newDisplayScore);
      },
        // increase the setTimeout duration (slow the animation) as the displayScore gets closer to score
        16 + 200 * Math.exp(-0.25*Math.abs(displayScore-score)));
    }
  });

  if (displayScore > score) {
    setDisplayScore(score);
  }

  const gameOverDisplay = (isGameOver) ? 'block' : 'none';
  return (
    <>
      <p style={{display: gameOverDisplay}} className={styles.status}>{isGameOver ? 'Game Over' : <span>&nbsp;</span>}</p>
      <p className={styles.highScore}><span className={glowHighScore ? styles.glow : ''}>High Score: {highScore}</span></p>
      <p className={styles.score}>{displayScore}</p>
    </>
  );
};