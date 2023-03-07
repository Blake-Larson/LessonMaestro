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

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);
  const userId = session?.user.id;
  const { id } = ctx.query;

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else if (id && typeof id === "string") {
    const studentId = await prisma.student.findMany({
      where: {
        userId,
        id: id,
      },
      select: {
        id: true,
      },
    });
    if (id === studentId[0]?.id) {
      return { props: { id: id } };
    } else {
      return {
        notFound: true, //redirects to 404 page
      };
    }
  } else {
    console.log("No id on query");
    return {
      notFound: true, //redirects to 404 page
    };
  }
};

const Student = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { id } = props;
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
  const [student, setStudent] = useState<StudentType>();
  const deleteMutation = api.student.deleteStudent.useMutation();

  async function deleteStudent(id: { id: string }) {
    confirm("Are you sure you want to delete this student?");
    deleteMutation.mutate(id);
    //refetch students so when we go to /students the students have been updated. Could optimize.
    await getStudents.refetch();
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
