import React, { useState } from "react";
import { type GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "../../server/auth";
import { api } from "../../utils/api";
import type { InferGetServerSidePropsType } from "next";
import Layout from "../../components/layout/Layout";
import type { StudentType } from "../../pages/students";
import DeleteIcon from "../../components/buttons/DeleteIcon";
import { prisma } from "../../server/db";
import Router from "next/router";

//work on checking if the student id param exists and if so return it.

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);
  const studentId = await prisma.student.findMany({
    select: {
      id: true,
    },
  });
  console.log(studentId);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else if (studentId && ctx.params) {
    let id = ctx.params;
    return { props: { id: id } };
  }
  return {
    notFound: true, //redirects to 404 page
  };
};

const Student = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { id } = props;
  const getStudent = api.student.getStudentByID.useQuery(
    { id: id?.id },
    {
      onSuccess: (data) => {
        setStudent(data);
      },
    }
  );
  const [student, setStudent] = useState<StudentType>();
  const deleteMutation = api.student.deleteStudent.useMutation({ id: id });

  async function deleteStudent(id: { id: string }) {
    confirm("Are you sure you want to delete this student?");
    deleteMutation.mutate(id);
    await Router.push("/students");
  }

  return (
    <Layout title={"Students"}>
      <>
        {getStudent.isLoading && (
          <button className="loading btn mt-5 self-center">loading</button>
        )}
        {student && (
          <div className="flex flex-col">
            <div>{student?.name}s profile page</div>
            <div
              className="btn-error btn-square btn p-1 transition-transform duration-300 hover:scale-110"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={() => deleteStudent({ id: student.id })}
            >
              <DeleteIcon width="8" height="8" />
            </div>
          </div>
        )}
      </>
    </Layout>
  );
};

export default Student;

//https://www.freecodecamp.org/news/how-to-setup-dynamic-routing-in-nextjs/
