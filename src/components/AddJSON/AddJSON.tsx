"use client"
import { useState } from "react"
import { Default, Question } from "@/types/default"
import styles from "./AddJSON.module.scss"
import api from "@/lib/axios/axios"
import { useSession } from "next-auth/react"

interface QuestionInput {
  id: string
  text: string
  options: string[]
  answer: string
}

export default function AddJSON({ onChange, questions, testid }: Default) {
  const [jsonInput, setJsonInput] = useState<string>("")
  const [messages, setMessages] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const { data: session } = useSession()

  const handleSaveJSON = async () => {
    if (!session?.user?.email) {
      setMessages(["❌ No email in session"])
      return
    }

    let parsed: unknown
    try {
      parsed = JSON.parse(jsonInput)
    } catch {
      setMessages(["❌ Invalid JSON"])
      return
    }

    if (!Array.isArray(parsed)) {
      setMessages(["❌ JSON must be an array of questions"])
      return
    }

    const validated: Question[] = []
    const errors: string[] = []

    parsed.forEach((q, i) => {
      const expectedId = String((questions?.length || 0) + i + 1)

      if (typeof q !== "object" || q === null) {
        errors.push(`❌ Question #${i + 1} is not an object`)
        return
      }

      const question = q as QuestionInput

      // проверка структуры
      if (
        typeof question.text !== "string" ||
        !Array.isArray(question.options) ||
        !question.options.every(o => typeof o === "string") ||
        typeof question.answer !== "string"
      ) {
        errors.push(`❌ Question #${i + 1} has invalid structure`)
        return
      }

      // проверка правильности id
      if (question.id !== expectedId) {
        errors.push(`❌ Question #${i + 1} has incorrect id "${question.id}", should be "${expectedId}"`)
        return
      }

      if (!question.options.includes(question.answer)) {
        errors.push(`❌ Question #${i + 1} answer must be one of options`)
        return
      }

      validated.push(question)
    })

    if (errors.length > 0) {
      setMessages(errors)
      return
    }

    try {
      setLoading(true)
      await api.post("/test/add-test-edit", {
        email: session.user.email,
        testid,
        questions: [...(questions || []), ...validated],
      })
      setMessages(["✅ JSON added successfully"])
      setJsonInput("")
    } catch (err) {
      console.error(err)
      setMessages(["❌ Error saving JSON"])
    } finally {
      setLoading(false)
      setTimeout(() => setMessages([]), 5000)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Add Questions JSON
        <span onClick={() => onChange("Default")}>✖ Close</span>
      </div>

      <textarea
        className={styles.textarea}
        placeholder='Paste array JSON, e.g.: [{"id":"1","text":"Q?","options":["1","2"],"answer":"1"}]'
        value={jsonInput}
        onChange={e => setJsonInput(e.target.value)}
      />

      <button className={styles.saveBtn} onClick={handleSaveJSON} disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </button>

      {messages.length > 0 && (
        <div className={styles.message}>
          {messages.map((m, i) => <p key={i}>{m}</p>)}
        </div>
      )}
    </div>
  )
}
