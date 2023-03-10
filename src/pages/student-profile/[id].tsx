import React, { useState } from "react";
import { type GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "../../server/auth";
import { api } from "../../utils/api";
import type { InferGetServerSidePropsType } from "next";
import Layout from "../../components/layout/Layout";
import type { StudentType } from "../students";
import DeleteIcon from "../../components/buttons/DeleteIcon";
import { prisma } from "../../server/db";
import Router from "next/router";
import EditStudent from "../../components/students/EditStudent";

type Edit = {
  id: string;
  field: string;
  active: boolean;
};

const Student = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  //Data Fetching
  const [student, setStudent] = useState<StudentType>();
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

  //Edit Mode

  const [edit, setEdit] = useState<Edit>({
    id: "",
    field: "",
    active: false,
  });

  // Delete Student

  const deleteMutation = api.student.deleteStudent.useMutation({
    onSuccess: async () => {
      await getStudents.refetch();
      await Router.push("/students");
    },
  });

  function deleteStudent(id: { id: string }) {
    confirm("Are you sure you want to delete this student?");
    deleteMutation.mutate(id);
  }

  return (
    <Layout title={<h1 className="font-lemon text-2xl">Students</h1>}>
      <>
        {getStudent.isLoading && (
          <button className="loading btn mt-5 self-center">loading</button>
        )}

        {student && (
          <div className="flex flex-col">
            <div>{student?.name}s profile page</div>
            <div>{student.age}</div>
            <div
              className="cursor-pointer"
              onClick={() =>
                setEdit({
                  id: id,
                  field: "name",
                  active: true,
                })
              }
            >
              {edit.field === "name" && edit.active ? (
                <EditStudent
                  student={student}
                  setStudent={setStudent}
                  setEdit={setEdit}
                  field={"name"}
                  inputType={"text"}
                />
              ) : (
                student.name
              )}
            </div>
            <div
              className="btn-error btn-square btn p-1 transition-transform duration-300 hover:scale-110"
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

export default Student;
