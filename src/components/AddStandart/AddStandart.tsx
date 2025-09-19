"use client"
import { useState } from "react"
import { Default, Question } from "@/types/default"
import styles from "./AddStandart.module.scss"
import { useSession } from "next-auth/react"
import api from "@/lib/axios/axios"

export default function AddStandart({ onChange, questions, testid }: Default) {
  const [newQuestion, setNewQuestion] = useState<string>("")
  const [options, setOptions] = useState<string[]>(["", ""]) // минимум 2 варианта
  const [answer, setAnswer] = useState<string>("")
  const [localQuestions, setLocalQuestions] = useState<Question[]>(questions || [])

  const { data: session } = useSession()
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const handleAddOption = () => {
    if (options.length < 7) {
      setOptions([...options, ""])
    }
  }

  const handleOptionChange = (value: string, index: number) => {
    const updated = [...options]
    updated[index] = value
    setOptions(updated)
  }

  const handleSave = async () => {
    setError("")

    // Вопрос
    if (!newQuestion.trim()) {
      setError("Please enter the question.")
      return
    }

    // Все варианты должны быть заполнены
    if (options.some(v => !v.trim())) {
      setError("Fill in all answer options.")
      return
    }

    // Проверка уникальности
    const uniqueOptions = new Set(options.map(v => v.trim()))
    if (uniqueOptions.size !== options.length) {
      setError("Options must be unique.")
      return
    }

    // Проверка правильного ответа
    if (!options.includes(answer)) {
      setError("Correct answer must match one of the options.")
      return
    }

    // Правильный ответ не должен повторяться
    const correctCount = options.filter(v => v === answer).length
    if (correctCount > 1) {
      setError("Correct answer must not be duplicated among options.")
      return
    }

    const newQ: Question = {
      id: String(localQuestions.length + 1), // простой порядковый номер
      text: newQuestion,
      options,
      answer,
    }

    if (!session?.user?.email) {
      setError("❌ No email in session")
      return
    }

    try {
      setLoading(true)
      await api.post("/test/add-standart-test", {
        email: session.user.email,
        testid,
        question: newQ,
      })

      setLocalQuestions([...localQuestions, newQ])

      // reset form
      setNewQuestion("")
      setOptions(["", ""])
      setAnswer("")
    } catch  {
      console.error("❌ Error while saving question:")
      setError("Error while saving question")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Standart
        <span onClick={() => onChange("Default")}>✖ Close</span>
      </div>

      <div className={styles.form}>
        <label>Question #{localQuestions.length + 1}</label>
        <input
          type="text"
          value={newQuestion}
          onChange={e => setNewQuestion(e.target.value)}
          placeholder="Enter your question"
        />

        <div className={styles.variants}>
          {options.map((v, i) => (
            <input
              key={i}
              type="text"
              value={v}
              placeholder={`Option ${i + 1}`}
              onChange={e => handleOptionChange(e.target.value, i)}
            />
          ))}
        </div>

        {options.length < 7 && (
          <button className={styles.smallBtn} onClick={handleAddOption}>
            + Add option
          </button>
        )}

        <label>Correct answer:</label>
        <input
          type="text"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          placeholder="Enter correct answer"
        />

        {error && <p className={styles.error}>{error}</p>}
        <button className={styles.saveBtn} onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  )
}
