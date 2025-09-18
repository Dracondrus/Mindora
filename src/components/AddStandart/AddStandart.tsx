// src/components/AddStandart/AddStandart.tsx
'use client'
import { Default } from '@/types/default'; // Импортируем типы
import styles from './AddStandart.module.scss';
// import MathEditorComponent from '../Math/Math';
import EditableMathExample from '../Math/Math';


export default function AddStandart({ onChange, questions }: Default) {

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Standart<span onClick={() => onChange('Default')}>Close</span>
      </div>

      <br />
    <EditableMathExample/>
  
    </div>
  );
}