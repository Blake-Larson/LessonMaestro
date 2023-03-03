import React from "react";
import { type GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "../../server/auth";
import { api } from "../../utils/api";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerAuthSession(ctx);
  const getStudent = api.student.getStudentByID.useQuery({ id: id });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else if (getStudent) {
  }

  return {
    props: {},
  };
}

const Student = () => {
  return <div>[id]</div>;
};

export default Student;

//https://www.freecodecamp.org/news/how-to-setup-dynamic-routing-in-nextjs/
