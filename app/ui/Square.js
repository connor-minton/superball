'use client';

import styles from './Square.module.css';

export default function Square({color, selected, goal, onClick}) {
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
  else if (goal)
    classes.push(styles.goal);

  return (
    <button
      className={classes.join(' ')}
      onClick={e => {e.stopPropagation(); onClick();}}
    >
    </button>
  );
};