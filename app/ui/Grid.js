'use client';

import Square from './Square';
import * as sb from '../lib/superball';

export default function Grid({colors, selected, onClick}) {
  const rows = [];
  for (let i = 0; i < 8; i++) {
    const row = [];
    for (let j = 0; j < 10; j++) {
      const index = i * 10 + j;
      row.push(
        <Square color={colors[index]}
                onClick={() => onClick(index)}
                selected={index === selected}
                goal={sb.isGoalSquare(index)}
                key={index} />
      );
    }
    rows.push(
      <div style={{marginLeft: '-5px'}} key={i}>{row}</div>
    );
  }

  return (
    <>
      {rows}
    </>
  );
};