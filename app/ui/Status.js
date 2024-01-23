'use client';

import styles from './Status.module.css';

export default function Status({score, highScore, isGameOver}) {
  const gameOverDisplay = (isGameOver) ? 'block' : 'none';
  return (
    <>
      <p style={{display: gameOverDisplay}} className={styles.status}>{isGameOver ? 'Game Over' : <span>&nbsp;</span>}</p>
      <p className={styles.highScore}>High Score: {highScore}</p>
      <p className={styles.score}>{score}</p>
    </>
  );
};