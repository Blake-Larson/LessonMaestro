import React, { useState } from "react";
import { api } from "../utils/api";
import Layout from "../components/layout/Layout";
import { type GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "../server/auth";
import AddIcon from "../components/buttons/AddIcon";
import XIcon from "../components/buttons/XIcon";
import CreateMusicItem from "../components/music/CreateMusicItem";
import MusicCard from "../components/music/MusicCard";
import type { Music } from "@prisma/client";

function Music() {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [music, setMusic] = useState<Music[]>([]);
  const getMusic = api.music.getMusic.useQuery(undefined, {
    onSuccess: (data) => {
      setMusic(data);
    },
  });

  return (
    <>
      <Layout
        title={
          <div className="flex items-center justify-between">
            <h1 className="text-2xl">Music</h1>
            <button
              className={`btn-square btn-sm btn p-1 ${
                showForm ? "btn-error" : "btn-secondary"
              }`}
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? (
                <XIcon width="5" height="5" />
              ) : (
                <AddIcon width="5" height="5" />
              )}
            </button>
          </div>
        }
      >
        <div className="flex min-h-screen w-full flex-col items-center bg-primary-light">
          {/* Loading Button */}
          {getMusic.isLoading && (
            <button className="loading btn m-5 self-center"></button>
          )}
          {/* Students */}
          <div
            className={`flex w-full flex-col items-center gap-5 py-5 lg:flex-row lg:flex-wrap lg:justify-center lg:px-5 ${
              showForm ? "hidden" : "flex"
            }`}
          >
            {music?.map((musicItem) => {
              return <MusicCard key={musicItem.id} musicItem={musicItem} />;
            })}
          </div>

          <div className={showForm ? "block pt-5" : "hidden pt-5"}>
            <CreateMusicItem
              music={music}
              setMusic={setMusic}
              showForm={showForm}
              setShowForm={setShowForm}
            />
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Music;

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
