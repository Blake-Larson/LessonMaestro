import React, { useState } from "react";
import type { GetStaticProps, NextPage } from "next";
import { api } from "../../utils/api";
import Layout from "../../components/layout/Layout";
import { Prisma } from "@prisma/client";
import Router from "next/router";
import StudentInfo from "../../components/students/StudentInfo";
import StudentMusicList from "../../components/students/StudentMusicList";
import { generateSSGHelper } from "../../server/helpers/ssgHelper";
import StudentLessonList from "~/components/students/StudentLessonList";
import StudentConceptList from "~/components/students/StudentConceptList";
import LoadingSpinner from "~/components/buttons/LoadingSpinner";

const studentWithAllFields = Prisma.validator<Prisma.StudentArgs>()({
  include: {
    music: true,
    lessons: true,
    concepts: true,
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
    <Layout topBar={<h1>Students</h1>}>
      <>
        {student && (
          <div className="flex flex-col items-center">
            {/* Mobile */}
            <div className="flex max-w-sm flex-col items-center gap-5 pb-10 lg:hidden">
              <StudentInfo student={student} setStudent={setStudent} />
              <StudentLessonList student={student} setStudent={setStudent} />
              <StudentMusicList student={student} setStudent={setStudent} />
              <StudentConceptList student={student} setStudent={setStudent} />
              <div className="flex w-full flex-col gap-6 rounded-lg bg-base-100 py-4 px-4 text-left shadow-lg">
                <h2 className="max-w-fit border-b-2 border-secondary text-lg font-semibold">
                  Admin
                </h2>
                <div
                  className="btn-outline btn-error btn-sm btn order-last self-center transition-transform duration-300 hover:scale-110"
                  onClick={() => deleteStudent({ id: student.id })}
                >
                  Delete Student
                </div>
              </div>
            </div>
            {/* lg: */}
            <div className="hidden w-full max-w-7xl justify-evenly gap-5 p-5 lg:flex">
              <div className="flex w-full max-w-sm flex-col items-center gap-5 rounded-xl bg-blue-50 p-5 shadow-2xl">
                <StudentInfo student={student} setStudent={setStudent} />
                <div className="flex w-full flex-col gap-6 rounded-lg bg-base-100 py-4 px-4 text-left shadow-lg">
                  <h2 className="max-w-fit border-b-2 border-secondary text-lg font-semibold">
                    Admin
                  </h2>
                  <div
                    className="btn-outline btn-error btn-sm btn order-last self-center transition-transform duration-300 hover:scale-110"
                    onClick={() => deleteStudent({ id: student.id })}
                  >
                    Delete Student
                  </div>
                </div>
              </div>
              <div className="hidden w-full max-w-xl flex-col items-center gap-5 rounded-xl bg-blue-50 p-5 shadow-2xl md:flex">
                <StudentLessonList student={student} setStudent={setStudent} />
                <StudentMusicList student={student} setStudent={setStudent} />
                <StudentConceptList student={student} setStudent={setStudent} />
              </div>
            </div>
          </div>
        )}
        {(getStudent.isLoading || getStudent.isRefetching) && (
          <LoadingSpinner />
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
