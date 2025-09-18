'use client';
import React, { useState, useEffect } from 'react';
import { addStyles, EditableMathField } from 'react-mathquill';

export default function MathEditor() {
  const [latex, setLatex] = useState('\\frac{1}{2}');

  // подключаем стили MathQuill только на клиенте
  useEffect(() => {
    addStyles();
  }, []);

  return (
    <div>
      <EditableMathField
        latex={latex}
        onChange={(mathField) => setLatex(mathField.latex())}
        style={{
          width: "100%",
          minHeight: 40,
          border: "1px solid #ccc",
          borderRadius: 8,
          padding: 8
        }}
      />
      <p>Ваш LaTeX: {latex}</p>
    </div>
  );
}
