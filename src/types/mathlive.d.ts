// src/types/mathlive.d.ts

// Глобальное объявление для JSX.IntrinsicElements
declare namespace JSX {
  interface IntrinsicElements {
    // Декларируем наш пользовательский элемент 'math-field'
    // Указываем, какие атрибуты он может принимать
    'math-field': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        value?: string;
        'virtual-keyboard-mode'?: string;
        // Добавьте сюда другие атрибуты, которые вы используете
      },
      HTMLElement
    >;
  }
}

// Декларация для ref, чтобы TypeScript знал о свойствах элемента
declare interface MathFieldElement extends HTMLElement {
  value: string;
  latex: string;
  // Добавляем методы, которые вы будете вызывать
  executeCommand: (command: string) => void;
  focus: () => void;
  blur: () => void;
}