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

  const collectable = sb.collectable(colors, selected);

  let highScore = localStorage.getItem('highScore');
  if (highScore == null) {
    highScore = 0;
    localStorage.setItem('highScore', 0);
  }

  function handleCollectClick() {
    setScore(score + collectable.length * sb.colorPoints(colors[selected]));
    const newColors = colors.slice();
    for (let square of collectable) {
      newColors[square] = '-';
    }
    // collectable will always have 5 or more squares to collect, so the following
    // should always succeed.
    sb.addColors(newColors, 3);
    setColors(newColors);
    setSelected(-1);
  }

  function handleSquareClick(id) {
    if (colors[id] === '-' || gameOver)
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
      const couldAdd = sb.addColors(newColors, 5);
      if (!couldAdd) {
        setGameOver(true);
        if (score > highScore) {
          localStorage.setItem('highScore', score);
        }
      }
      setColors(newColors);
      setSelected(-1);
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
