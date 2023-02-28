import React from "react";
import Layout from "../components/layout/Layout";
import Todos from "../components/todos/Todos";
import { type GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "../server/auth";

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

const dashboard = () => {
  return (
    <>
      <Layout title="Dashboard">
        <div className="flex flex-col-reverse items-center justify-evenly gap-5 p-5 2xl:flex-row 2xl:items-start">
          Dashboard Content
          {/* <CreateLesson /> */}
          {/* <LessonSection /> */}
          <Todos />
        </div>
      </Layout>
    </>
  );
};

export default dashboard;
