export interface User {
  id: number
  image: string
  firstname: string
  email: string
  localstorage: number
  localterm: number
  onlinestorage: number
  onlineterm: number
  privateservice: number
  privatestorage: number
  privateterm: number
  publicservice: number
  publicstorage: number
  publicterm: number
 limitcreate: number
  services: Services[] // можно заменить на конкретный тип, если знаете структуру
}


interface Services{
  testid: string,
  title: string,
  email: string,
  status: string,
  expire: string,
  questions: Questions[]
}

interface Questions {
  id: number
  question: string,
  variants: string[]
  correctAnswer: string
}