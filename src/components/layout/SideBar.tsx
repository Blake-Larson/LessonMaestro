import React from "react";
import Logo from "../Logo";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

function SideBar() {
  const { isSignedIn, user } = useUser();
  return (
    <div className="menu relative w-64 overflow-y-auto border-r border-base-200 bg-base-100 p-4 text-base-content">
      <Logo />
      <div className="divider"></div>

      <ul className="flex flex-col gap-3">
        <li>
          <Link href="/dashboard" className="hover:bg-blue-100">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/students" className="hover:bg-blue-100">
            Students
          </Link>
        </li>
        <li>
          <Link href="/music" className="hover:bg-blue-100">
            Music
          </Link>
        </li>
      </ul>
      <div className="absolute bottom-10 left-0 right-0 m-auto flex justify-center md:hidden">
        {isSignedIn && (
          <div className="flex items-center justify-center gap-2">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "h-12 w-12",
                },
              }}
            />
            <span>{`${user.firstName ? user.firstName : ""} ${
              user.lastName ? user.lastName : ""
            }`}</span>
          </div>
        )}
      </div>
      {/* WORK IN PROGRESS
        <Link href="/account" className="btn-ghost btn">
          Account Settings
        </Link> */}
    </div>
  );
}

export default SideBar;
