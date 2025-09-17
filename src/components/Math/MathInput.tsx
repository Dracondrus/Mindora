"use client"

import { useEffect, useRef } from "react"
import "mathlive" // подключаем Web Component

interface MathInputProps {
  value: string
  onChange: (latex: string) => void
}

export default function MathInput({ value, onChange }: MathInputProps) {
  const ref = useRef<any>(null)

  useEffect(() => {
    if (ref.current) {
      // устанавливаем начальное значение
      ref.current.value = value

      // ловим изменения
      const handleInput = (evt: any) => {
        onChange(evt.target.value)
      }
      ref.current.addEventListener("input", handleInput)

      return () => {
        ref.current?.removeEventListener("input", handleInput)
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
          borderRadius: "10px"
        }}
      ></math-field>
    </div>
  )
}
