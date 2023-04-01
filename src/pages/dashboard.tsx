import React, { useState } from "react";
import AddIcon from "~/components/icons/AddIcon";
import XIcon from "~/components/icons/XIcon";
import CreateLesson from "~/components/lessons/CreateLesson";
import Lessons from "~/components/lessons/Lessons";
import Layout from "../components/layout/Layout";
import Todos from "../components/todos/Todos";

const Dashboard = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  return (
    <>
      <Layout
        topBar={
          <div className="flex items-center gap-5">
            <h1>Dashboard</h1>
            <button
              className={`btn-square btn-sm btn p-1 ${
                showForm ? "btn-error" : "btn-secondary"
              }`}
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? (
                <XIcon width="5" height="5" />
              ) : (
                <AddIcon width="5" height="5" />
              )}
            </button>
          </div>
        }
      >
        <div className="min-h-screen w-full">
          <div
            className={`${
              showForm ? "hidden" : "flex"
            } flex-col-reverse items-center justify-evenly gap-5 p-5 2xl:flex-row 2xl:items-start`}
          >
            <Lessons />
            <Todos />
          </div>
          <div className={showForm ? "block pt-5" : "hidden pt-5"}>
            <CreateLesson setShowForm={setShowForm} />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
