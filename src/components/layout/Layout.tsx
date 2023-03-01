import React from "react";
import Hamburger from "../buttons/Hamburger";
import Footer from "./Footer";
import SideBar from "./SideBar";

interface Props {
  children: JSX.Element;
  title: string;
}

const Layout = ({ children, title }: Props) => {
  return (
    <>
      <div className="drawer-mobile drawer">
        <input id="drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex min-h-full flex-col">
          {/* <!-- Page content here --> */}
          <div className="sticky top-0 z-50 flex w-full items-center gap-5 border-b border-base-200 bg-base-100 p-3">
            <Hamburger />
            <h1 className="font-lemon text-2xl">{title}</h1>
          </div>
          <div className="flex flex-col p-2">{children}</div>
          <Footer />
        </div>
        <div className="drawer-side">
          <label htmlFor="drawer" className="drawer-overlay"></label>
          <SideBar />
        </div>
      </div>
    </>
  );
};

export default Layout;
