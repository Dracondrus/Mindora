'use client';

import Loading from "@/components/Loading/Loading";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthCheckProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  // вытащим текущий язык (ru/uz/en), если нет — по умолчанию ru
  const locale = pathname.split("/")[1] || "ru";

  const isMainPage = pathname === "/" || /^\/(ru|uz|en)$/.test(pathname);
  const isLoginPage = /^\/(ru|uz|en)\/login$/.test(pathname);

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      if (!isMainPage && !isLoginPage) {
        router.replace(`/${locale}/login`);
      }
    }

    if (status === "authenticated") {
      if (isLoginPage) {
        router.replace(`/${locale}`);
      }
    }
  }, [status, session, pathname, router, isMainPage, isLoginPage, locale]);

  if (status === "loading") {
    return <Loading/>;
  }

  return <>{children}</>;
}
