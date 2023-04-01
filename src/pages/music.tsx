import React, { useState } from "react";
import { api } from "../utils/api";
import Layout from "../components/layout/Layout";
import AddIcon from "../components/buttons/AddIcon";
import XIcon from "../components/buttons/XIcon";
import { Prisma } from "@prisma/client";
import MusicCard from "../components/music/MusicCard";
import CreateMusicItem from "../components/music/CreateMusicItem";
import LoadingSpinner from "~/components/buttons/LoadingSpinner";

const musicItemWithAllFields = Prisma.validator<Prisma.MusicArgs>()({
  include: {
    student: true,
  },
});

export type MusicItemWithAllFields = Prisma.MusicGetPayload<
  typeof musicItemWithAllFields
>;

function Music() {
  //Data Handling
  const [showForm, setShowForm] = useState<boolean>(false);
  const [music, setMusic] = useState<MusicItemWithAllFields[]>([]);
  const getMusic = api.music.getMusic.useQuery(undefined, {
    onSuccess: (data) => {
      setMusic(data);
    },
  });

  //Edit Mode

  return (
    <>
      <Layout
        topBar={
          <div className="flex items-center gap-5">
            <h1>Music</h1>
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
        <div className="flex min-h-screen w-full flex-col items-center">
          <div
            className={`flex w-full flex-col items-center gap-3 py-5 lg:flex-row lg:flex-wrap lg:justify-center lg:px-5 ${
              showForm ? "hidden" : "flex"
            }`}
          >
            {music?.map((musicItem) => (
              <div
                className="mx-5 mt-5 flex w-full max-w-sm flex-col gap-3 rounded-lg bg-base-100 py-4 px-4 text-left shadow-lg"
                key={musicItem.id}
              >
                <MusicCard
                  key={musicItem.id}
                  musicItem={musicItem}
                  setMusic={setMusic}
                />
              </div>
            ))}
          </div>
          {getMusic.isLoading && <LoadingSpinner />}
          <div className={showForm ? "block pt-5" : "hidden pt-5"}>
            <CreateMusicItem
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
