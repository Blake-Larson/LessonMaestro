import Link from "next/link";
import React from "react";
import SideBar from "../components/SideBar";
// import LessonSection from './LessonSection';
// import CreateLesson from '../components/CreateLesson';
// import Todos from '../components/Todos';

const dashboard = () => {
  return (
    <div>
      <div className="drawer-mobile drawer">
        <input id="drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex min-h-full flex-col">
          {/* <!-- Page content here --> */}
          <div>
            <div className="sticky top-0 z-50 flex w-full items-center justify-center gap-5 border-b border-base-200 bg-base-100 p-3 lg:justify-start">
              <h1 className="font-lemon text-2xl">Dashboard</h1>
              {/* <CreateLesson /> */}
            </div>
            <div className="flex flex-col-reverse items-center justify-evenly gap-5 p-5 2xl:flex-row 2xl:items-start">
              {/* <LessonSection /> */}
              {/* <Todos /> */}
            </div>
          </div>
          {/* <Footer />
                    <Hamburger /> */}
        </div>
        <div className="drawer-side">
          <label htmlFor="drawer" className="drawer-overlay"></label>
          <SideBar />
        </div>
      </div>
    </div>
  );
};

export default dashboard;
