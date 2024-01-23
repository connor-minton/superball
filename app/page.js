'use client';

import SuperballPage from './ui/SuperballPage';
import NoSSRWrapper from './ui/NoSSRWrapper';

export default function Home() {
  return (
    <NoSSRWrapper>
      <SuperballPage />
    </NoSSRWrapper>
  );
}
