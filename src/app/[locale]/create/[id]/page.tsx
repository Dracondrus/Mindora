'use client'

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useSession } from "next-auth/react"
import api from "@/lib/axios/axios"
import styles from "./Work.module.scss"

export default function Work() {
  const router = useRouter()
  const params = useParams()   // { id: "..." }
  const { data: session } = useSession()
  const [test, setTest] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const [value,setValue] = useState<string>("")
  useEffect(() => {
    if (!session?.user?.email || !params?.id) return

    setLoading(true)

    api.post("/users/get-own-test", {
      email: session.user.email,
      testid: params.id  // используем params.id
    })
    .then(res => {
      setTest(res.data)
      setLoading(false)
    })
    .catch(err => {
      console.error("❌ Ошибка получения теста:", err)
      setLoading(false)
    })
  }, []) // добавляем зависимости

  return (
    <div className={styles.container}>
      <button onClick={() => router.back()}>Back</button>

      {loading ? (
        <p>Downloading test</p>
      ) : test ? (
        <div className={styles.testInfo}>
          <h2>{test.title}</h2>
          <p>Status: {test.status}</p>
          <p>Created: {test.expire}</p>
          <p>Questions: {test.questions?.length}</p>
          <input type="text" value={value} onChange={(e) => setValue(e.target.value) } />
          {/* здесь можно добавить кнопку редактирования */}
        </div>
      ) : (
        <p>Empty</p>
      )}
    </div>
  )
}
