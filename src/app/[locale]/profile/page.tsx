'use client';

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

import styles from "./Profile.module.scss"
import { useEffect, useState } from "react";
import api from "@/lib/axios/axios";



export default function ProfilePage() {

 const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState<User >({} as User);

  useEffect(() => {
  if (session?.user?.email) {
    api.get(`/users/${session.user.email}`)
      .then((res) => setUserInfo(res.data))
      .catch((err) => console.error("Ошибка при получении юзера:", err));
  }
}, []);

  console.log(userInfo)
  
  return (


    <div className={styles.container}>

{session?.user ?
<div>
   <div className={styles.profile__info}>
 <div className={styles.profile}>
   <Image src={session.user.image || ""} alt="user iamge" width={50}  height={50} style={{borderRadius:"50%"}}/>
   {session.user.name}
   <br />
   {session.user.email}
 </div>
  <div className={styles.signOutButton} onClick={() => signOut()}>Sign out</div>
   </div> 
   <br />

    <div className={styles.profile__info_items}>
      {userInfo && (
  <>
    <div className={styles.text}>Your possibilities create of storage</div>

    <div className={styles.possibility}>
      <span>Local </span>
      <span>{userInfo.quantitylocalcreateservice}</span>
    </div>
    <div className={styles.possibility}>
      <span>Online </span>
      <span>{userInfo.quantityonlinecreateservice}</span>
    </div>
    <div className={styles.possibility}>
      <span>Private </span>
      <span>{userInfo.quantityprivatecreateservice}</span>
    </div>
    <div className={styles.possibility}>
      <span>Public </span>
      <span>{userInfo.quantitypubliccreateservice}</span>
    </div>
    <br />
    <br />
  </>
)}

    </div>
</div>
 : 
<div style={{fontSize:40, fontWeight:900, textAlign:"center"}}>-_-</div>
}


    </div>
  );
}