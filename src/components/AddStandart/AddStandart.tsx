// src/components/AddStandart/AddStandart.tsx

import { Default } from '@/types/default'; // Импортируем типы
import styles from './AddStandart.module.scss';

import { useState } from 'react';





export default function AddStandart({ onChange, questions }: Default) {


  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Standart<span onClick={() => onChange('Default')}>Close</span>
      </div>

      <br />
\


   
    </div>
  );
}