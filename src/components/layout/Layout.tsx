import React from "react";
import Hamburger from "../buttons/Hamburger";
import Footer from "./Footer";
import SideBar from "./SideBar";

interface Props {
  children: JSX.Element;
  title: JSX.Element;
}

const Layout = ({ children, title }: Props) => {
  return (
    <>
      <div className="drawer-mobile drawer min-h-screen w-full">
        <input id="drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content min-h-full">
          {/* <!-- Page content here --> */}
          <div className="sticky top-0 z-50 flex w-full items-center gap-5 border-b border-base-200 bg-base-100 p-3">
            <Hamburger />
            <div className="w-full">{title}</div>
          </div>
          <div className="flex min-h-full w-full flex-col">{children}</div>
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
