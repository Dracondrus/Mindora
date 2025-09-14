'use client'

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import { checkStorage } from "@/lib/localstorage/localStorage"
import ModalWindow from "@/components/ModalWindow/ModalWindow"
import api from "@/lib/axios/axios"
import { User } from "@/types/user"

import styles from "./Create.module.scss"

export default function Create () {
  const { data: session } = useSession()
  const [modal, setModal] = useState(false)
  const [userInfo, setUserInfo] = useState<User>({} as User)
  const router = useRouter()

  useEffect(() => {
    checkStorage()

    if (session?.user?.email) {
      api.post("/user-get-info", {
        email: session.user.email
      })
      .then(res => {
        setUserInfo(res.data) 
      })
      .catch(err => {
        console.error("❌ Ошибка получения пользователя:", err)
      })
    }
  }, [session])

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span>Your works</span> 
        {modal 
          ? <button className={styles.btn} onClick={() => setModal(false)}>Cancel</button> 
          : <button disabled={userInfo.limitcreate <=0} className={styles.btn} onClick={() => setModal(true)}>Add new</button>
        } 
      </div>

      <div className={styles.title}>Limit {userInfo.limitcreate}</div>
      {modal && <ModalWindow/>}
      <br />
      <hr/>
      <br />

      <div>
        {userInfo.services?.map(test => (
          <div key={test.testid}>
            <div className={styles.test}>
              {test.title} 
              <button 
                className={styles.testInfo}
                onClick={() => router.push(`/create/${test.testid}`)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
              </button> 
            </div>
            <br />
          </div>
        ))}
      </div>
    </div>
  )
}
  