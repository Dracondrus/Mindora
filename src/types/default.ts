

export interface Default {
  questions : Question[]
  onChange: (newValue: string) => void
}
interface Question {
  id: string
  text: string
  options: string[]
  answer: string
}