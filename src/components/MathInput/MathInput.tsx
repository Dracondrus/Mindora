"use client";

import "mathlive"; // регистрирует <math-field>

type MathTextareaProps = {
  value: string;
  onChange: (val: string) => void;
  className?: string;
};

export default function MathTextarea({ value, onChange, className }: MathTextareaProps) {
  return (
    <math-field
      class={className}
      value={value}
      virtualkeyboardmode="manual"
      virtualkeyboardtheme="apple"
      smartfence
      defaultmode="math"
      onInput={(evt: Event) => {
        const target = evt.target as any;
        onChange(target.value);
      }}
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "8px",
        minHeight: "50px",
        width: "100%",
      }}
    />
  );
}
