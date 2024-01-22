'use client';

import styles from './Status.module.css';

export default function Status({score, highScore, isGameOver}) {
  return (
    <>
      <p className={styles.status}>{isGameOver ? 'Game Over' : <span>&nbsp;</span>}</p>
      <p className={styles.highScore}>High Score: {highScore}</p>
      <p className={styles.score}>{score}</p>
    </>
  );
};