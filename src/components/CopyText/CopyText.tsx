"use client"

import { useState } from "react"
import styles from "./CopyText.module.scss"

interface CopyTextProps {
  text: string
}

export default function CopyText({ text }: CopyTextProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000) // убираем уведомление через 2 сек
    } catch (err) {
      console.error("Ошибка копирования:", err)
    }
  }

  return (
    <div className={styles.copyBox}>
     
      <div className={styles.copyBtn} onClick={handleCopy}>
        <>{copied ? "Copired" : "Copy test id"}</>
      </div>
    </div>
  )
}
