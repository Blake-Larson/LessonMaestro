import React from "react";
import Link from "next/link";
import { SignInButton, useUser } from "@clerk/nextjs";

const Login = () => {
  const { user, isSignedIn } = useUser();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-white text-center text-2xl">
        {isSignedIn && <span>Hey {user?.firstName}, welcome back!</span>}
      </p>
      <div className="flex flex-col gap-3">
        {isSignedIn && (
          <Link href={"/dashboard"} className="btn-secondary btn">
            Dashboard
          </Link>
        )}
        {!isSignedIn && (
          <div className="btn-secondary btn">
            <SignInButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
