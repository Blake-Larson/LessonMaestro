import Link from "next/link";
import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/" className="btn-ghost btn h-fit p-1 normal-case">
      <div className="flex items-center gap-2">
        <div className="relative h-12 w-12 rounded-full bg-base-100">
          {/* <Image
            src="/assets/logo/logo.png"
            fill
            sizes="10vw"
            className="object-cover"
            alt="Lots of guitars, a Keyboard, and a mic in a room"
          /> */}
          <img src="/assets/logo/logo.png" alt="My music studio logo" />
        </div>
        <span className="font-lemon text-lg font-normal">My Music Studio</span>
      </div>
    </Link>
  );
};

export default Logo;
