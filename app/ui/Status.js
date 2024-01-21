'use client';

export default function Status({score, isGameOver}) {
  return (
    <div>
      <p>{isGameOver ? 'Game Over' : <span>&nbsp;</span>}</p>
      <p>Score: {score}</p>
    </div>
  );
};