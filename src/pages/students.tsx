import React, { useState } from "react";
import { api } from "../utils/api";
import Layout from "../components/layout/Layout";
import { type GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "../server/auth";
import StudentCard from "../components/students/StudentCard";
import CreateStudent from "../components/students/CreateStudent";
import AddIcon from "../components/buttons/AddIcon";
import XIcon from "../components/buttons/XIcon";
import type { StudentWithAllFields } from "./student/[id]";

const StudentsPage = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [students, setStudents] = useState<StudentWithAllFields[]>([]);
  const getStudents = api.student.getStudents.useQuery(undefined, {
    onSuccess: (data) => {
      setStudents(data);
    },
  });

  return (
    <>
      <Layout
        title={
          <div className="flex items-center justify-between">
            <h1 className="text-2xl">Students</h1>
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
        <div className="flex min-h-screen w-full flex-col items-center bg-primary-light">
          {/* Loading Button */}
          {getStudents.isLoading && (
            <button className="loading btn m-5 self-center"></button>
          )}
          {/* Students */}
          <div
            className={`flex w-full flex-col items-center gap-5 py-5 lg:flex-row lg:flex-wrap lg:justify-center lg:px-5 ${
              showForm ? "hidden" : "flex"
            }`}
          >
            {students?.map((student) => {
              return <StudentCard key={student.id} student={student} />;
            })}
          </div>

          <div className={showForm ? "block pt-5" : "hidden pt-5"}>
            <CreateStudent
              students={students}
              setStudents={setStudents}
              showForm={showForm}
              setShowForm={setShowForm}
            />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default StudentsPage;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
