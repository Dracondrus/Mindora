"use client"
import { useState } from "react"
import { Default, Question } from "@/types/default"
import styles from "./EditQuestion.module.scss"
import api from "@/lib/axios/axios"
import { useSession } from "next-auth/react"

export default function EditQuestion({ onChange, questions, testid }: Default) {
  const [search, setSearch] = useState("")
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [localQuestions, setLocalQuestions] = useState<Question[]>(questions || [])
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const { data: session } = useSession()

  // 🔎 фильтрация
  const filtered = localQuestions.filter(q =>
    q.text.toLowerCase().includes(search.toLowerCase())
  )

  // 🗑 удалить (без перенумерации id)
  const handleDelete = (id: string) => {
    setLocalQuestions(prev => prev.filter(q => q.id !== id))
    setConfirmDelete(null)
  }

  // 💾 сохранить все вопросы
  const handleSaveAll = async () => {
    if (!session?.user?.email) {
      setMessage("❌ Нет email в сессии")
      return
    }

    try {
      setLoading(true)
      setMessage(null)

      await api.post("/test/add-test-edit", {
        email: session.user.email,
        testid,
        questions: localQuestions,
      })

      setMessage("✅ Изменения сохранены")
    } catch (err) {
      console.error("Ошибка при сохранении:", err)
      setMessage("❌ Ошибка при сохранении")
    } finally {
      setLoading(false)
      setTimeout(() => setMessage(null), 3000)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Edit Questions
        <span onClick={() => onChange("Default")}>✖ Close</span>
      </div>

      <input
        type="text"
        className={styles.search}
        placeholder="Search questions..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className={styles.saveAllWrapper}>
        <button
          className={styles.saveBtn}
          onClick={handleSaveAll}
          disabled={loading}
        >
          {loading ? "Saving..." : " Save"}
        </button>
        {message && <p className={styles.message}>{message}</p>}
      </div>
      <br />

      <div className={styles.table}>
        {filtered.map((q, index) => (
          <div key={q.id} className={styles.row}>
            {/* 👉 вместо id выводим порядковый номер */}
            <div className={styles.id}>{index + 1}</div>
            <div className={styles.text} title={q.text}>
              {q.text}
            </div>
            <div className={styles.actions}>
              <button onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}>
                {expandedId === q.id ? "▲" : "▼"}
              </button>

              {confirmDelete === q.id ? (
                <>
                  <button
                    className={styles.confirmYes}
                    onClick={() => handleDelete(q.id)}
                  >
                    Yes
                  </button>
                  <button
                    className={styles.confirmNo}
                    onClick={() => setConfirmDelete(null)}
                  >
                    No
                  </button>
                </>
              ) : (
                <button
                  className={styles.deleteBtn}
                  onClick={() => setConfirmDelete(q.id)}
                >
                  x
                </button>
              )}
            </div>

            {expandedId === q.id && (
              <div className={styles.expanded}>
                <label>Question:</label>
                <textarea
                  value={q.text}
                  rows={3}
                  onChange={e => {
                    setLocalQuestions(prev =>
                      prev.map(item =>
                        item.id === q.id ? { ...item, text: e.target.value } : item
                      )
                    )
                  }}
                />

                <label>Options:</label>
                <ul>
                  {q.options.map((opt, i) => (
                    <li key={i}>
                      <input
                        type="text"
                        value={opt}
                        onChange={e => {
                          setLocalQuestions(prev =>
                            prev.map(item =>
                              item.id === q.id
                                ? {
                                    ...item,
                                    options: item.options.map((o, idx) =>
                                      idx === i ? e.target.value : o
                                    ),
                                  }
                                : item
                            )
                          )
                        }}
                      />
                    </li>
                  ))}
                </ul>

                <label>Correct answer:</label>
                <input
                  type="text"
                  value={q.answer}
                  onChange={e => {
                    setLocalQuestions(prev =>
                      prev.map(item =>
                        item.id === q.id ? { ...item, answer: e.target.value } : item
                      )
                    )
                  }}
                />

                <div className={styles.editActions}>
                  <button
                    className={styles.cancelBtn}
                    onClick={() => setExpandedId(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <br />
    </div>
  )
}
