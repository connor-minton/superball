'use client';

import styles from './Controls.module.css';

export default function Controls({collectable, onCollectClick}) {
  return (
    <>
      <button className={styles.collect} disabled={!collectable} onClick={onCollectClick}>Collect</button>
    </>
  );
};