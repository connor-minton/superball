'use client';

export default function Controls({collectable, onCollectClick}) {
  return (
    <div>
      <button disabled={!collectable} onClick={onCollectClick}>Collect</button>
    </div>
  );
};