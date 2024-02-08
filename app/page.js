'use client';

import SuperballPage from './ui/SuperballPage';
import NoSSRWrapper from './ui/NoSSRWrapper';
import { useState } from 'react';
import Modal from './ui/Modal';

export default function Home() {
  const [helpModalShown, setHelpModalShown] = useState(false);

  function handleHelpClick() {
    setHelpModalShown(!helpModalShown);
  };

  return (
    <NoSSRWrapper>
      {(helpModalShown && <Modal onClose={handleHelpClick}>
        <h1>How to Play</h1>
        <p>To get started, click two colored squares to swap them. Five gray squares become colored. To get points, click a goal square (a square with a border) and then click "Collect". To do this, you must have at least five squares of the same color in a chain. All of the squares in your chain leave the board, and three new squares become colored.</p>
        <p>For every square that leaves the board, you earn a certain number of points:</p>
        <ul>
          <li><span style={{color:'var(--sb-purple)'}}>Purple: 2 points</span></li>
          <li><span style={{color:'var(--sb-blue)'}}>Blue: 3 points</span></li>
          <li><span style={{color:'var(--sb-yellow)'}}>Yellow: 4 points</span></li>
          <li><span style={{color:'var(--sb-red)'}}>Red: 5 points</span></li>
          <li><span style={{color:'var(--sb-green)'}}>Green: 6 points</span></li>
        </ul>
        <p>Good luck, and have fun!</p>
      </Modal>)}
      <SuperballPage onHelpClick={handleHelpClick}/>
    </NoSSRWrapper>
  );
}
