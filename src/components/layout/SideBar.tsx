import React from "react";
import Logo from "./Logo";
// import { Image } from 'cloudinary-react';
// import SignOut from "./buttons/SignOut";
import Link from "next/link";

function SideBar() {
  return (
    <div className="menu flex w-64 flex-col overflow-y-auto border-r border-base-200 bg-base-100 p-4 text-base-content">
      <Logo />
      <div className="divider"></div>
      <ul className="flex flex-col gap-3">
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/students">Students</Link>
        </li>
        <li>
          <Link href="/account">Account Settings</Link>
        </li>
      </ul>
      <div className="absolute bottom-0 left-0 right-0 mt-auto flex flex-col items-center gap-5 p-2 pb-5">
        <div className="flex gap-3 rounded-lg bg-secondary-light p-5 px-10">
          {/* <div className='avatar'>
						<div className='w-16 rounded'>
							<Image
								cloudName='drwljgjhd'
								publicId={
									user.profileImg
										? user.profileImg
										: 'https://res.cloudinary.com/drwljgjhd/image/upload/v1664830344/w1plcgp0zhfp0jbnykyu.jpg'
								}
							/>
						</div>
					</div> */}
          <div className="flex flex-col justify-center">
            {/* <span className='text-lg'>{user.userName}</span> */}
            <span className="text-sm">Teacher</span>
          </div>
        </div>
        {/* <SignOut color={"nuetral"} textColor={"nuetral"} /> */}
      </div>
    </div>
  );
}

export default SideBar;
