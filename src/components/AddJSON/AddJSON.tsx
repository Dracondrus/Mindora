
import { Default } from "@/types/default"
import styles from "./AddJSON.module.scss"

export default function AddJSON ({onChange,questions} : Default) {


    return (
        <div>
                      <div className={styles.title}>JSON<span onClick={() => onChange("Default")}> Close</span> </div>
        </div>
    )
}