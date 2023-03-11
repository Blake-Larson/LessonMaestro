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
import Image from "next/image";
import StudentInput from "../../components/students/StudentInput";

export type Edit = {
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
          <div className="flex h-full flex-col gap-5 bg-base-200">
            <div className="mx-5 mt-5 flex w-full max-w-sm flex-col items-center gap-3 rounded-lg bg-base-100 py-8 shadow-lg">
              <div className="avatar">
                <div className="relative h-16 w-16 rounded-xl">
                  <Image
                    src={"/assets/images/teach.jpg"} // replace with student.image
                    fill
                    sizes="100%"
                    alt={`photo of ${student.name}`}
                  />
                </div>
              </div>
              <div className="text-xl font-bold">
                <StudentInput
                  student={student}
                  setStudent={setStudent}
                  edit={edit}
                  setEdit={setEdit}
                  field={"name"}
                  inputType={"text"}
                  value={student.name}
                />
              </div>
            </div>

            <div className="mx-5 flex w-full max-w-sm flex-col items-center gap-3 rounded-lg bg-base-100 py-8 pl-8 text-left shadow-lg">
              <h2 className="w-full text-lg font-semibold">Contact</h2>
              <div className="flex w-full flex-col gap-1">
                <div>
                  <StudentInput
                    student={student}
                    setStudent={setStudent}
                    edit={edit}
                    setEdit={setEdit}
                    field={"phone"}
                    inputType={"text"}
                    value={student.phone ? student.phone : ""}
                  />
                </div>
                <div>
                  <StudentInput
                    student={student}
                    setStudent={setStudent}
                    edit={edit}
                    setEdit={setEdit}
                    field={"email"}
                    inputType={"email"}
                    value={student.email ? student.email : ""}
                  />
                </div>
                <div>
                  <StudentInput
                    student={student}
                    setStudent={setStudent}
                    edit={edit}
                    setEdit={setEdit}
                    field={"contact"}
                    inputType={"text"}
                    value={student.contact ? student.contact : ""}
                  />
                </div>
              </div>
            </div>

            <div>
              <StudentInput
                student={student}
                setStudent={setStudent}
                edit={edit}
                setEdit={setEdit}
                field={"age"}
                inputType={"number"}
                value={student.age ? student.age.toString() : ""}
              />
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
