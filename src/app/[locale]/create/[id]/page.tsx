'use client'

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useSession } from "next-auth/react"
import api from "@/lib/axios/axios"
import styles from "./Work.module.scss"
import CopyText from "@/components/CopyText/CopyText"
import EditQuestion from "@/components/EditQuestion/EditQuestion"
import AddStandart from "@/components/AddStandart/AddStandart"
import AddJSON from "@/components/AddJSON/AddJSON"
import ConfirmLeave from "@/components/ConfirmLeave/ConfirmLeave"

// Тип вопроса
interface Question {
  id: string
  text: string
  options: string[]
  answer: string
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

  const [warning, setWarning] = useState<boolean>(false)

const [changeState,setChangeState] = useState<string>("Default")

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
  }, []) // ✅ зависимости добавлены

  const onDelete = () => {
    if (!session?.user) return

    api.post("/users/delete-service", {
      email: session.user.email,
      testid: params.id
    }).finally(() => {

      router.push("/create")
    })

  }

  return (
    <div className={styles.container}>



      {loading ? (
        <b>Downloading test...</b>
      ) : test ? (
        <div>

         
    {changeState == "Default" && <div>
      
       <div className={styles.container_btn}>
            <div>  {test.title}</div>
            <div onClick={() => router.back()}>Back</div>
          </div>
          <br />
   <div className={styles.container_btn}>  <CopyText text={test.testid} />status {test.status} </div>
  <div className={styles.container_btn}>    <div>Quantity questions {test.questions.length}</div> {test.expire} </div>

<br />
<br />
<div className={styles.containerChanges}>
  <button onClick={() => setChangeState("EditQuestions")} className={styles.changebtn}>Edit questions</button>
<button onClick={() => setChangeState("AddStandart")} className={styles.changebtn}>Add Standart</button>
<button onClick={() => setChangeState("AddJSON")} className={styles.changebtn}>Add JSON</button>
</div>
      
      </div>}
   {changeState == "EditQuestions" && <EditQuestion testid={test.testid} questions={test.questions} onChange={setChangeState}/>}
   {changeState == "AddStandart" && <AddStandart testid={test.testid} questions={test.questions} onChange={setChangeState}/>}
  {changeState == "AddJSON" && <AddJSON testid={test.testid} questions={test.questions} onChange={setChangeState}/>}
        </div>
      ) : (
        <p>Empty</p>
      )}
      <br />
      <br />
      <ConfirmLeave/>
     {changeState == "Default" && <> { warning ? <div className={styles.flex}>Are you shure ?  &nbsp;&nbsp;<div onClick={() => setWarning(!warning)} >No</div>&nbsp;&nbsp;&nbsp; <div onClick={onDelete}>Yes</div> </div> : <div onClick={() => setWarning(!warning)}> <b style={{ color: "Red" }}>Delete</b> </div>}</> }
    </div>
  )
}
