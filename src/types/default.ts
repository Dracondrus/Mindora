

export interface Default {
  testid:string,
  questions : Question[]
  onChange: (newValue: string) => void
}
export interface Question {
  id: string
  text: string
  options: string[]
  answer: string
}