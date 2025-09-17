'use client';

import Loading from "@/components/Loading/Loading";
import { useSession, signIn } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import api from "@/lib/axios/axios"; // <-- твой axios instance

import styles from "./Login.module.scss";

export default function Login() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const locale = pathname.split("/")[1] || "ru";

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      api.post("/users", {
        email: session.user.email,
        name: session.user.name,
        image: session.user.image,
      })
      .catch((err) => {
        console.error("Ошибка при добавлении пользователя:", err);
      })
      .finally(() => {
        router.replace(`/${locale}`);
      });
    }
  }, [status, session, locale, router]);

  if (status === "loading") {
    return (
      <div className={styles.wrapper}>
        <Loading />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.button}
        onClick={() => signIn("google")}
      >
        Enter with Google
      </button>
    </div>
  );
}
