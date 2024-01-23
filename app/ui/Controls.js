'use client';

import styles from './Controls.module.css';

export default function Controls({collectable, onCollectClick, isGameOver}) {
  return (
    <>
      <button
        className={styles.collect}
        disabled={!collectable && !isGameOver}
        onClick={onCollectClick}
      >
        {isGameOver ? 'Play Again' : 'Collect'}
      </button>
    </>
  );
};