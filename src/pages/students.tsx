import React from "react";
import Layout from "../components/layout/Layout";
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

const students = () => {
  return (
    <>
      <Layout title="Students">
        <div>Student Content</div>
      </Layout>
    </>
  );
};

export default students;
