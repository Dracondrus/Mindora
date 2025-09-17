// src/components/AddStandart/AddStandart.tsx

import { Default } from '@/types/default'; // Импортируем типы
import styles from './AddStandart.module.scss';
import MathInput from '../Math/MathInput';
import { useState } from 'react';





export default function AddStandart({ onChange, questions }: Default) {

 const [latex, setLatex] = useState("Enter question")


  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Standart<span onClick={() => onChange('Default')}>Close</span>
      </div>

      <br />

      <MathInput value={latex} onChange={setLatex} />

      <div style={{ marginTop: 20 }}>
        <b>Saved LaTeX:</b> {latex}
      </div>


   
    </div>
  );
}