'use client'

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useSession } from "next-auth/react"
import api from "@/lib/axios/axios"
import styles from "./Work.module.scss"

// Тип вопроса
interface Question {
  id: string
  text: string
  options?: string[]
  answer?: string
}

// Тип теста
interface Test {
  testid: string
  title: string
  status: string
  expire: string
  questions: Question[]
}

export default function Work() {
  const router = useRouter()
  const params = useParams<{ id: string }>() // { id: "..." }
  const { data: session } = useSession()

  const [test, setTest] = useState<Test | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [value, setValue] = useState<string>("")

  useEffect(() => {
    if (!session?.user?.email || !params?.id) return

    setLoading(true)

    api.post<Test>("/users/get-own-test", {
      email: session.user.email,
      testid: params.id
    })
      .then(res => {
        setTest(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error("❌ Ошибка получения теста:", err)
        setLoading(false)
      })
  }, [session?.user?.email, params?.id]) // ✅ зависимости добавлены

  return (
    <div className={styles.container}>
      <button onClick={() => router.back()}>Back</button>

      {loading ? (
        <p>Downloading test...</p>
      ) : test ? (
        <div className={styles.testInfo}>
          <h2>{test.title}</h2>
          <p>Status: {test.status}</p>
          <p>Created: {test.expire}</p>
          <p>Questions: {test.questions?.length}</p>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      ) : (
        <p>Empty</p>
      )}
    </div>
  )
}
