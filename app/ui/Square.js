'use client';

import { useRef, useLayoutEffect } from 'react';

import styles from './Square.module.css';

export default function Square({color, selected, goal, onClick, glow}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    // force animation to play again
    ref.current.style.animation = 'none';
    ref.current.offsetHeight; // <-- witchcraft. do not remove
    ref.current.style.animation = null;
  }, [color]);

  const colorMap = {
    p: 'purple',
    b: 'blue',
    y: 'yellow',
    r: 'red',
    g: 'green',
    '-': 'gray'
  };

  const classes = [styles.square, styles[colorMap[color]]];
  if (selected)
    classes.push(styles.selected);
  if (goal)
    classes.push(styles.goal);
  if (glow)
    classes.push(styles.glow);

  return (
    <button
      className={classes.join(' ')}
      onClick={e => {e.stopPropagation(); onClick();}}
      ref={ref}
    >
    </button>
  );
};