'use client';

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

import styles from "./Profile.module.scss"
import { useEffect, useState } from "react";
import api from "@/lib/axios/axios";
import { User } from "../../../types/user";



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
    <div className={styles.text}> Create  storage</div>

    <div className={styles.possibility}>
      <span>Local </span>
      <span>{userInfo.localstorage}</span>
    </div>
  
    <div className={styles.possibility}>
      <span>Public </span>
      <span>{userInfo.publicstorage}</span>
    </div>
    <div className={styles.possibility}>
      <span>Private </span>
      <span>{userInfo.privatestorage}</span>
    </div>
    <br />
  <div className={styles.text}> Add to service</div>
    <div className={styles.possibility}>
      <span>Public service</span>
      <span>{userInfo.publicservice}</span>
    </div>
      <div className={styles.possibility}>
      <span>Private service</span>
      <span>{userInfo.privateservice}</span>
    </div>
<br />
      <div className={styles.text}> Term of service </div>
    <div className={styles.possibility}>
      <span>Local term</span>
      <span>{userInfo.localterm}</span>
    </div>
  
     <div className={styles.possibility}>
      <span>Public term</span>
      <span>{userInfo.publicterm}</span>
    </div>
     <div className={styles.possibility}>
      <span>Private term</span>
      <span>{userInfo.privateterm}</span>
    </div>

 <br />
    <div className={styles.possibility}>
      <span>Limit create</span>
      <span>{userInfo.limitcreate}</span>
    </div>

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