import Link from "next/link";
import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <Link
      href="/"
      className="btn-ghost btn h-fit p-1 normal-case hover:bg-blue-100"
    >
      <div className="flex items-center gap-2">
        <div className="relative h-12 w-12 rounded-full bg-base-100">
          <Image
            src="/assets/logo.png"
            fill
            sizes="10vw"
            className="object-cover"
            alt="Lots of guitars, a Keyboard, and a mic in a room"
          />
        </div>
        <span className="font-lemon text-lg font-normal">Lesson Maestro</span>
      </div>
    </Link>
  );
};

export default Logo;
