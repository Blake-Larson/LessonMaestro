import React from "react";
import Lessons from "~/components/lessons/Lessons";
import Layout from "../components/layout/Layout";
import Todos from "../components/todos/Todos";

const Dashboard = () => {
  return (
    <>
      <Layout title={<h1 className="text-2xl">Dashboard</h1>}>
        <div className="flex flex-col-reverse items-center justify-evenly gap-5 p-5 2xl:flex-row 2xl:items-start">
          {/* <CreateLesson /> */}
          <Lessons />
          <Todos />
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
