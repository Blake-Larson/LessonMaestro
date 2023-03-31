import { UserButton, useUser } from "@clerk/nextjs";
import React from "react";
import Hamburger from "../buttons/Hamburger";
import Footer from "./Footer";
import SideBar from "./SideBar";

interface Props {
  children: JSX.Element;
  topBar: JSX.Element;
}

const Layout = ({ children, topBar }: Props) => {
  const { isSignedIn } = useUser();
  return (
    <>
      <div className="drawer-mobile drawer min-h-screen w-full">
        <input id="drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content min-h-full bg-gradient-to-t from-emerald-400 to-emerald-50">
          {/* <!-- Page content here --> */}
          <div className="sticky top-0 z-50 flex w-full items-center gap-5 p-5 ">
            <Hamburger />
            <div className="flex w-full justify-between">
              <div className="text-3xl font-semibold md:ml-5">{topBar}</div>
              <div className="hidden h-10 w-10 md:flex">
                {isSignedIn && (
                  <UserButton
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "w-full h-full",
                      },
                    }}
                  />
                )}
              </div>
            </div>
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
