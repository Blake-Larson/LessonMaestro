import React from "react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="custom-10vh mt-auto grid w-full grid-cols-1 items-center bg-neutral px-3 py-0.5 text-base-100 md:grid-cols-3">
      <div>
        <Logo />
      </div>
      <div className="text-center">
        <a
          href="https://blakelarson.dev/"
          className="btn-outline btn-primary btn-sm btn text-center normal-case"
        >
          More work by Blake Larson
        </a>
      </div>
      <p className="text-center md:text-end">
        Copyright © 2023 - All right reserved
      </p>
    </footer>
  );
};

export default Footer;
