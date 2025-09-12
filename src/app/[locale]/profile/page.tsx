'use client';

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

import styles from "./Profile.module.scss"



export default function ProfilePage() {

  const { data: session } = useSession();
  console.log(session?.user)
  return (


    <div className={styles.container}>

{session?.user ?
 <div>
  <Image src={session.user.image || ""} alt="user iamge" width={60}  height={60} style={{borderRadius:"50%"}}/>
   </div> 
 : 
<div style={{fontSize:40, fontWeight:900, textAlign:"center"}}>-_-</div>
}

<button onClick={() => signOut()}>sign out</button>
    </div>
  );
}