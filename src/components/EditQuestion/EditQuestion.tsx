

import { Default } from "@/types/default"
import styles from "./EditQuestion.module.scss"



export default function EditQuestion ({onChange,questions} : Default) {


    return (
        <div>
            <div className={styles.title}>Edit<span onClick={() => onChange("Default")}> Close</span> </div>
        </div>
    )
}