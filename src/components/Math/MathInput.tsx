"use client"

import { useEffect, useRef } from "react"
import "mathlive"
import { MathfieldElement } from "mathlive" // Импортируем тип

interface MathInputProps {
  value: string
  onChange: (latex: string) => void
}

export default function MathInput({ value, onChange }: MathInputProps) {
  // Типизируем ref как MathfieldElement
  const ref = useRef<MathfieldElement>(null)

  useEffect(() => {
    // Внутри useEffect проверяем, что ref.current существует и является элементом
    const mf = ref.current
    if (mf) {
      // устанавливаем начальное значение
      mf.value = value

      // ловим изменения
      const handleInput = (evt: Event) => {
        // evt.target приводим к типу MathfieldElement
        onChange((evt.target as MathfieldElement).value)
      }
      mf.addEventListener("input", handleInput)

      return () => {
        mf.removeEventListener("input", handleInput)
      }
    }
  }, [value, onChange])

  return (
    <div style={{ width: "100%" }}>
      <math-field
        ref={ref}
        style={{
          width: "100%",
          minHeight: "60px",
          border: "1px solid #ccc",
          padding: "10px",
          fontSize: "18px",
          borderRadius: "10px",
        }}
      ></math-field>
    </div>
  )
}