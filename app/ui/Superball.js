'use client';

import { useState } from 'react';

import Grid from './Grid';
import Status from './Status';
import Controls from './Controls';

import * as sb from '../lib/superball';

const firstBoard = Array(80).fill('-');
sb.addColors(firstBoard, 5);

export default function Superball() {
  const [selected, setSelected] = useState(-1);
  const [colors, setColors] = useState(firstBoard);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const collectable = sb.collectable(colors, selected);

  function handleClick(id) {
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
      if (!couldAdd)
        setGameOver(true);
      setColors(newColors);
      setSelected(-1);
    }
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

  return (
    <>
      <Grid colors={colors} selected={selected} onClick={handleClick} />
      <Status score={score} isGameOver={gameOver} />
      <Controls collectable={collectable.length > 0} onCollectClick={handleCollectClick} />
    </>
  );
};