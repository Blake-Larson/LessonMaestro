import React from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

const Login = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col gap-3">
        {isSignedIn && (
          <Link href={"/dashboard"} className="btn-secondary btn">
            Dashboard
          </Link>
        )}
        {!isSignedIn && (
          <Link href={"/sign-in"} className="btn-secondary btn">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Login;
