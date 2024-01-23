'use client';

import { useState } from 'react';

import Grid from './Grid';
import Status from './Status';
import Controls from './Controls';

import * as sb from '../lib/superball';

import styles from './Superball.module.css';

export default function Superball({selected, handleSquareClick, handleCollectClick, colors, score, gameOver, highScore}) {
  const collectable = sb.collectable(colors, selected);

  return (
    <div className={styles.container}>
      <div className={styles.fakesidebar}></div>
      <div className={styles.grid}>
        <Grid colors={colors} selected={selected} onClick={handleSquareClick} />
      </div>
      <div className={styles.sidebar}>
        <div className={styles.mobileControls}>
          <Controls collectable={collectable.length > 0} onCollectClick={handleCollectClick} isGameOver={gameOver}/>
        </div>
        <div className={styles.status}>
          <Status score={score} highScore={highScore} isGameOver={gameOver} />
        </div>
        <div className={styles.controls}>
          <Controls collectable={collectable.length > 0} onCollectClick={handleCollectClick} isGameOver={gameOver}/>
        </div>
      </div>
    </div>
  );
};