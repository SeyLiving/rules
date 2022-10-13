import React, { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const protecta = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/auth/login");
    }
  }, [status]);

  return (
    <div className="w-80 bg-green-500 flex justify-center">
      Protecta
    {status == "authenticated" ? (
  <button onClick={() => signOut({callbackUrl: "/"})}>
    LogOut
  </button>
    ) : (
      <button>Login</button>
    )}
      </div>
    ); 
};

export default protecta;
