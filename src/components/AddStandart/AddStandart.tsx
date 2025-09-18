// src/components/AddStandart/AddStandart.tsx
'use client'
import { Default } from '@/types/default'; // Импортируем типы
import styles from './AddStandart.module.scss';

import { useState } from 'react';

import MathTextarea from '../MathInput/MathInput';



export default function AddStandart({ onChange, questions }: Default) {

 const [latex, setLatex] = useState("f(x)=\\log _10 x");
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Standart<span onClick={() => onChange('Default')}>Close</span>
      </div>

      <br />
      <MathTextarea value={latex} onChange={setLatex} />
      <p className="mt-4">LaTeX: {latex}</p>
   
    </div>
  );
}