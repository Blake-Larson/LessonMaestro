import React from "react";
import Logo from "../Logo";
// import { Image } from 'cloudinary-react';
// import SignOut from "./buttons/SignOut";
import Link from "next/link";

function SideBar() {
  return (
    <div className="menu w-64 overflow-y-auto border-r border-base-200 bg-base-100 p-4 text-base-content">
      <Logo />
      <div className="divider"></div>
      <div className="flex h-[83vh] flex-col justify-between">
        <ul className="flex flex-col gap-3">
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/students">Students</Link>
          </li>
          <li>
            <Link href="/music">Music</Link>
          </li>
        </ul>
        <Link href="/account" className="btn-ghost btn">
          Account Settings
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
