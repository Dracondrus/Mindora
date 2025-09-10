'use client';

import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
export default function Home() {
    const { data: session, status } = useSession();
  return (
    <div>
      <button onClick={() => signIn("google")}>
        Sign in with Google
      </button>

      <br />
      {status}
    </div>
  );
}
