import React from "react";
import Layout from "../components/Layout";
import Todos from "../components/Todos";

const dashboard = () => {
  return (
    <>
      <Layout title="Dashboard">
        <div className="flex flex-col-reverse items-center justify-evenly gap-5 p-5 2xl:flex-row 2xl:items-start">
          Dashboard Content
          {/* <CreateLesson /> */}
          {/* <LessonSection /> */}
          <Todos />
        </div>
      </Layout>
    </>
  );
};

export default dashboard;
