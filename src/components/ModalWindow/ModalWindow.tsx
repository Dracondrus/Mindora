'use client'

import { useState } from "react"
import styles from "./ModalWindow.module.scss"
import { useSession } from "next-auth/react"
import { v4 as uuidv4 } from "uuid"
import api from "@/lib/axios/axios"


export default function ModalWindow () {
  const { data: session } = useSession()
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")

  const handleCreateTest = async () => {
    if (!title.trim()) {
      setMessage("Just enter name -_-")
      return
    }

    if (!session?.user?.email) {
      setMessage(" Not reg")
      return
    }

    const testData = {
      title,
      testid: uuidv4(),           // уникальный идентификатор теста
      email: session.user.email,  // берём из session
      status: "draft",                 // пустая строка
      expire: new Date().toISOString().split("T")[0], // сегодня YYYY-MM-DD
      questions: []               // пока пустой массив
    }

    try {
      const res = await api.post("/users/add-service", testData)
      setMessage(res.data)       // выводим сообщение от сервера
      setTitle("")               // очищаем input
      window.location.reload()
    } catch (err) {
      console.error(err)
      setMessage(" any error with you )")
    }
  }

  

  return (
    <div className={styles.container}>
      <input
      maxLength={14}
        type="text"
        placeholder="Enter name of test"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button className={styles.btn} onClick={handleCreateTest}>Create</button>

      {message && <p>{message}</p>}
    </div>
  )
}
