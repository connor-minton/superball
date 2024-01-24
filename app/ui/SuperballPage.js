'use client';

import Superball from './Superball';

import { useState } from 'react';
import * as sb from '../lib/superball';

const firstBoard = Array(80).fill('-');
sb.addColors(firstBoard, 5);

export default function Home() {
  const [selected, setSelected] = useState(-1);
  const [colors, setColors] = useState(firstBoard);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [animating, setAnimating] = useState(false);

  const collectable = sb.collectable(colors, selected);

  let highScore = localStorage.getItem('highScore');
  if (highScore == null) {
    highScore = 0;
    localStorage.setItem('highScore', 0);
  }

  function handleCollectClick() {
    if (animating) return;

    if (gameOver) {
      setScore(0);
      setGameOver(false);
      const newBoard = Array(80).fill('-');
      sb.addColors(newBoard, 5);
      setColors(newBoard);
      return;
    }

    setScore(score + collectable.length * sb.colorPoints(colors[selected]));
    const newColors = colors.slice();
    for (let square of collectable) {
      newColors[square] = '-';
    }
    setColors(newColors);
    setSelected(-1);

    setTimeout(() => {
      // collectable will always have 5 or more squares to collect, so the following
      // should always succeed.
      const newNewColors = newColors.slice();
      sb.addColors(newNewColors, 3);
      setColors(newNewColors);
    }, 500);
  }

  function handleSquareClick(id) {
    if (animating || colors[id] === '-' || gameOver)
      return;

    if (id == selected)
      setSelected(-1);
    else if (selected < 0)
      setSelected(id);
    else {
      // swap the colors
      const newColors = colors.slice();
      newColors[id] = colors[selected];
      newColors[selected] = colors[id];
      setColors(newColors);
      setAnimating(true);
      setSelected(-1);

      // generate new colors later
      setTimeout(() => {
        const newNewColors = newColors.slice();
        const couldAdd = sb.addColors(newNewColors, 5);
        if (!couldAdd) {
          setGameOver(true);
          if (score > highScore) {
            localStorage.setItem('highScore', score);
          }
        }
        setAnimating(false);
        setColors(newNewColors);
      }, 500);
    }
  }

  function handleOtherClick() {
    setSelected(-1);
  }

  return (
    <div style={{height:'100vh', width:'100vw'}} onClick={handleOtherClick}>
      <h1 style={{textAlign: 'center'}}>Superball</h1>
      <Superball
        handleSquareClick={handleSquareClick}
        selected={selected}
        handleCollectClick={handleCollectClick}
        score={score}
        gameOver={gameOver}
        colors={colors}
        highScore={highScore}
      />
    </div>
  );
}
