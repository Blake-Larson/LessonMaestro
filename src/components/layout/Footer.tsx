import React from "react";
import Logo from "../Logo";

const Footer = () => {
  return (
    <footer className="mt-auto hidden w-full items-center bg-neutral px-3 py-0.5 text-base-100 sm:grid sm:grid-cols-3">
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
      <p className="text-center sm:text-end">Copyright © 2023</p>
    </footer>
  );
};

export default Footer;
