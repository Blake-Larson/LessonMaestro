import React from "react";
import Link from "next/link";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

const Login = () => {
  const { isLoaded: isSignedIn } = useUser();
  const { user } = useUser();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-white text-center text-2xl">
        {isSignedIn && <span>Hey {user?.firstName}, welcome back!</span>}
      </p>
      <div className="flex gap-3">
        {isSignedIn && (
          <Link href={"/dashboard"} className="btn-secondary btn">
            Dashboard
          </Link>
        )}
        <div className="border-slate-400 flex border-b p-4">
          {/* {!isSignedIn && ( */}
          <div className="flex justify-center">
            <SignInButton />
          </div>
          {/* )} */}
          {isSignedIn && <SignOutButton />}
        </div>
      </div>
    </div>
  );
};

export default Login;
