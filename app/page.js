'use client';

import SuperballPage from './ui/SuperballPage';
import NoSSRWrapper from './ui/NoSSRWrapper';
import { useState } from 'react';
import HelpModal from './ui/HelpModal';

export default function Home() {
  const [helpModalShown, setHelpModalShown] = useState(false);

  function handleHelpClick() {
    setHelpModalShown(!helpModalShown);
  };

  return (
    <NoSSRWrapper>
      {(helpModalShown && <HelpModal onHelpClick={handleHelpClick}/>)}
      <SuperballPage onHelpClick={handleHelpClick}/>
    </NoSSRWrapper>
  );
}
