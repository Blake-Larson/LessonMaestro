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
    <Layout topBar={<h1 className="font-lemon text-2xl">Students</h1>}>
      <>
        {getStudent.isLoading && <LoadingSpinner />}

        {student && (
          <div className="flex h-full flex-col items-center gap-5 pb-10">
            <StudentInfo student={student} setStudent={setStudent} />
            <StudentLessonList student={student} setStudent={setStudent} />
            <StudentMusicList student={student} setStudent={setStudent} />
            <StudentConceptList student={student} setStudent={setStudent} />

            <div className="mx-5 flex w-full max-w-sm flex-col gap-6 rounded-lg bg-base-100 py-4 px-4 text-left shadow-lg">
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
