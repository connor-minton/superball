'use client';

import Image from "next/image";
import styles from "./page.module.css";
import Superball from './ui/Superball';
import NoSSRWrapper from './ui/NoSSRWrapper';

export default function Home() {
  return (
    <NoSSRWrapper>
      <h1 style={{textAlign: 'center'}}>Superball</h1>
      <Superball />
    </NoSSRWrapper>
  );
}
