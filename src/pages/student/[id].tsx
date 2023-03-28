import React, { useState } from "react";
import type { GetStaticProps, NextPage } from "next";
import { api } from "../../utils/api";
import Layout from "../../components/layout/Layout";
import { Prisma } from "@prisma/client";
import Router from "next/router";
import StudentInfo from "../../components/students/StudentInfo";
import StudentMusicList from "../../components/students/StudentMusicList";
import { generateSSGHelper } from "../../server/helpers/ssgHelper";

const studentWithAllFields = Prisma.validator<Prisma.StudentArgs>()({
  include: {
    music: true,
    lesson: true,
    concept: true,
  },
});

export type StudentWithAllFields = Prisma.StudentGetPayload<
  typeof studentWithAllFields
>;

const StudentPage: NextPage<{ id: string }> = ({ id }) => {
  //Data Fetching
  const [student, setStudent] = useState<StudentWithAllFields>();
  const getStudents = api.student.getStudents.useQuery(undefined, {
    enabled: false,
  });
  const getStudent = api.student.getStudentByID.useQuery(
    { id: id },
    {
      onSuccess: (data) => {
        if (data) {
          setStudent(data);
        }
      },
    }
  );

  // Delete Student

  const deleteMutation = api.student.deleteStudent.useMutation({
    onSuccess: async () => {
      await getStudents.refetch();
      await Router.push("/students");
    },
  });

  function deleteStudent(id: { id: string }) {
    if (confirm("Are you sure you want to delete this student?")) {
      deleteMutation.mutate(id);
    }
  }

  return (
    <Layout title={<h1 className="font-lemon text-2xl">Students</h1>}>
      <>
        {getStudent.isLoading && (
          <button className="loading btn mt-5 self-center">loading</button>
        )}

        {student && (
          <div className="flex h-full flex-col items-center gap-5 bg-base-200 pb-10">
            <StudentInfo student={student} setStudent={setStudent} />
            <div className="mx-5 flex w-full max-w-sm flex-col gap-3 rounded-lg bg-base-100 py-8 px-4 text-left shadow-lg">
              <h2 className="max-w-fit border-b-2 border-primary text-lg font-semibold">
                Lessons
              </h2>
              <span>Work in progress...</span>
            </div>

            <StudentMusicList student={student} setStudent={setStudent} />

            <div className="mx-5 flex w-full max-w-sm flex-col gap-3 rounded-lg bg-base-100 py-8 px-4 text-left shadow-lg">
              <h2 className="max-w-fit border-b-2 border-primary text-lg font-semibold">
                Work
              </h2>
              <span>Work in progress...</span>
            </div>
            <div className="mx-5 flex w-full max-w-sm flex-col gap-6 rounded-lg bg-base-100 py-8 px-4 text-left shadow-lg">
              <h2 className="max-w-fit border-b-2 border-primary text-lg font-semibold">
                Admin
              </h2>
              <div
                className="btn-outline btn-error btn-sm btn self-center transition-transform duration-300 hover:scale-110"
                onClick={() => deleteStudent({ id: student.id })}
              >
                Delete Student
              </div>
            </div>
          </div>
        )}
      </>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const id = context.params?.id;

  if (typeof id !== "string") throw new Error("no id");

  await ssg.student.getStudentByID.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default StudentPage;
