import React, { useState } from "react";
import { api } from "../utils/api";
import Layout from "../components/layout/Layout";
import { type GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "../server/auth";
import StudentCard from "../components/students/StudentCard";
import CreateStudent from "../components/students/CreateStudent";
import AddIcon from "../components/buttons/AddIcon";
import XIcon from "../components/buttons/XIcon";

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

export type StudentType = {
  lesson: Lesson[];
  music: Music[];
  work: Work[];
  id: string;
  name: string;
  email: string | null;
  image: string | null;
  age: number | null;
  phone: string | null;
  contact: string | null;
  instrument: string | null;
  status: boolean;
};

const StudentsPage = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [students, setStudents] = useState<StudentType[]>([]);
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
            <h1 className="font-lemon text-2xl">Students</h1>
            <button
              className={
                showForm
                  ? "btn-error btn-square btn"
                  : "btn-secondary btn-square btn"
              }
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? (
                <div className="cursor-pointer rounded-md">
                  <XIcon width="7" height="7" />
                </div>
              ) : (
                <div className="cursor-pointer rounded-md">
                  <AddIcon width="7" height="7" />
                </div>
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
