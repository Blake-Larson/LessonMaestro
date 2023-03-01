import React, { useState } from "react";
import { api } from "../utils/api";
import Layout from "../components/layout/Layout";
import { type GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "../server/auth";
import StudentTable from "../components/students/StudentTable";

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
  id: string;
  name: string;
  age: number | null;
  phone: string | null;
  email: string | null;
  contact: string | null;
  instrument: string | null;
  status: boolean;
  image: string | null;
  userId: string;
};

const StudentsPage = () => {
  const [students, setStudents] = useState<StudentType[]>([]);
  const getStudents = api.student.getStudents.useQuery();
  console.log(getStudents.data);

  return (
    <>
      <Layout title="Students">
        <div>
          {getStudents.isLoading && (
            <button className="loading btn mt-5 self-center">loading</button>
          )}
          <StudentTable students={students} setStudents={setStudents} />
        </div>
      </Layout>
    </>
  );
};

export default StudentsPage;
