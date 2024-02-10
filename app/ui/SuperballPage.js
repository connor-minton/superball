'use client';

import Superball from './Superball';
import Modal from './Modal';
import Leaderboards from './Leaderboards';

import { useState, useEffect } from 'react';
import * as sb from '../lib/superball';

import styles from './SuperballPage.module.css';

import confetti from 'canvas-confetti';

export default function SuperballPage({onHelpClick}) {
  let firstScore = 0;
  let firstBoard;
  let firstGameStarted = false;

  // if player has a saved game
  if (localStorage.getItem('colors')) {
    firstBoard = JSON.parse(localStorage.getItem('colors'));
    firstScore = Number.parseInt(localStorage.getItem('score')) || 0;
    firstGameStarted = true;
  }
  else {
    firstBoard = Array(80).fill('-');
    sb.addColors(firstBoard, 5);
  }

  const [selected, setSelected] = useState(-1);
  const [colors, setColors] = useState(firstBoard);
  const [score, setScore] = useState(firstScore);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(firstGameStarted);
  const [animating, setAnimating] = useState(false);
  const [glowHighScore, setGlowHighScore] = useState(false);
  const [lbModalShown, setLbModalShown] = useState(false);
  const [newGameModalShown, setNewGameModalShown] = useState(false);
  const [lbScoreSubmitted, setLbScoreSubmitted] = useState(false);

  const collectable = sb.collectable(colors, selected);

  let highScore = localStorage.getItem('highScore');
  if (highScore == null) {
    highScore = 0;
    localStorage.setItem('highScore', 0);
  }

  useEffect(() => {
    if (gameOver && !lbScoreSubmitted && !lbModalShown) {
      let ignore = false;

      // check if score beats any leaderboard scores
      fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + '/leaderboards')
        .then(data => data.json())
        .then(data => {
          if (ignore) return;

          let highScore = false;
          const username = localStorage.getItem('username');
          // first check if player already has a score on the leaderboard
          let playerEntry = data.find(e => e.name === username);
          if (playerEntry && score > playerEntry.score)
            highScore = true;
          else if (!playerEntry && data.length < 5)
            highScore = true;
          else if (!playerEntry)
            highScore = (data.findIndex(e => score > e.score) > -1);

          if (highScore && !username) {
            setTimeout(() => {
              setLbModalShown(true);
            }, 2000);
          }
          else if (highScore) {
            return submitHighScore(username, score);
          }
        })
          .catch(() => {});

      return () => { ignore = true; };
    }
  }, [lbModalShown, lbScoreSubmitted, gameOver]);

  function submitHighScore(username, score) {
    return fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + '/leaderboards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: username,
        score: score
      })
    })
      .then(() => {
        setLbScoreSubmitted(true);
      });
  }

  function newGame() {
    setScore(0);
    setGameOver(false);
    setGameStarted(false);
    setLbScoreSubmitted(false);
    setGlowHighScore(false);
    const newBoard = Array(80).fill('-');
    sb.addColors(newBoard, 5);
    setColors(newBoard);
    localStorage.removeItem('colors');
    localStorage.removeItem('score');
  }

  function handleCollectClick() {
    if (animating) return;

    if (gameOver) {
      newGame();
      return;
    }

    let newScore = score + collectable.length * sb.colorPoints(colors[selected]);
    setScore(newScore);
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
      localStorage.setItem('colors', JSON.stringify(newNewColors));
      localStorage.setItem('score', newScore);
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
      setGameStarted(true);

      // generate new colors later
      setTimeout(() => {
        const newNewColors = newColors.slice();
        const couldAdd = sb.addColors(newNewColors, 5);
        if (!couldAdd) {
          setGameOver(true);
          if (score > highScore) {
            localStorage.setItem('highScore', score);
            confetti({
              origin: {
                x: 0.5,
                y: 1
              }
            });
            setGlowHighScore(true);
          }

        }
        setAnimating(false);
        setColors(newNewColors);
        if (couldAdd)
          localStorage.setItem('colors', JSON.stringify(newNewColors));
        else {
          localStorage.removeItem('colors');
          localStorage.removeItem('score');
        }
      }, 500);
    }
  }

  function handleOtherClick() {
    setSelected(-1);
  }

  function handleLbClick() {
    setLbModalShown(!lbModalShown);
  }

  function handleNewGameClick() {
    setNewGameModalShown(!newGameModalShown);
  }

  function handleScoreSubmitted() {
    setLbScoreSubmitted(true);
  }

  return (
    <div style={{height:'100vh', width:'100vw'}} onClick={handleOtherClick}>
      {lbModalShown && <Modal onClose={handleLbClick}>
        <Leaderboards score={score} submitted={lbScoreSubmitted} onSubmit={handleScoreSubmitted} />
      </Modal>}
      {newGameModalShown && <Modal onClose={handleNewGameClick}>
        <h1>Start over?</h1>
        <div className={styles.startOverButtonContainer}>
          <button className={styles.modalButton + ' ' + styles.danger} onClick={() => {newGame(); handleNewGameClick();}}>Yes</button>
          <button className={styles.modalButton} onClick={handleNewGameClick}>No</button>
        </div>
      </Modal>}
      <h1 style={{textAlign: 'center'}}>
        Superball
        <button className={styles.iconButton} onClick={e => {e.stopPropagation(); onHelpClick();}}>
          <i style={{fontSize: '22px'}} className="fa-regular fa-circle-question"></i>
        </button>
        {gameStarted && <button className={styles.iconButton} onClick={e => {e.stopPropagation(); handleNewGameClick();}}>
          <i style={{fontSize: '22px'}} className="fa-solid fa-arrows-rotate"></i>
        </button>}
        <button className={styles.iconButton} onClick={e => {e.stopPropagation(); handleLbClick();}}>
          <i style={{fontSize: '22px'}} className="fa-solid fa-trophy"></i>
        </button>
      </h1>
      <Superball
        handleSquareClick={handleSquareClick}
        selected={selected}
        handleCollectClick={handleCollectClick}
        score={score}
        gameOver={gameOver}
        colors={colors}
        highScore={highScore}
        glowHighScore={glowHighScore}
      />
    </div>
  );
}
