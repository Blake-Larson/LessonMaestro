import React, { useState } from "react";
import { type GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "../../server/auth";
import { api } from "../../utils/api";
import type { InferGetServerSidePropsType } from "next";
import Layout from "../../components/layout/Layout";
import { Prisma } from "@prisma/client";
import { prisma } from "../../server/db";
import Router from "next/router";
import DocumentIcon from "../../components/buttons/DocumentIcon";
import EditMusicItem from "../../components/music/EditMusicItem";
import XIcon from "../../components/buttons/XIcon";
import CheckIcon from "../../components/buttons/CheckIcon";
import EditIcon from "../../components/buttons/EditIcon";

const musicItemWithAllFields = Prisma.validator<Prisma.MusicArgs>()({
  include: {
    studentMusic: { include: { music: true, student: true } },
  },
});

export type MusicItemWithAllFields = Prisma.MusicGetPayload<
  typeof musicItemWithAllFields
>;

export type FormData = {
  id: string;
  title: string;
  composer: string;
  year: string;
};

export type Edit = {
  group: string;
  active: boolean;
};

const MusicItemPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  //Data Handling
  const [musicItem, setMusicItem] = useState<MusicItemWithAllFields>();
  const { id } = props;
  const getMusic = api.music.getMusic.useQuery(undefined, {
    enabled: false,
  });
  const getMusicItem = api.music.getMusicById.useQuery(id, {
    onSuccess: (data) => {
      if (data) {
        setMusicItem(data);
      }
    },
  });

  const updateMusic = api.music.updateMusicItem.useMutation({
    onError: () => {
      console.log(updateMusic.error?.message);
    },
  });

  //Edit Mode

  const [edit, setEdit] = useState<Edit>({
    group: "",
    active: false,
  });

  //Form Handling

  const [formData, setFormData] = React.useState<FormData>({
    id: "",
    title: "",
    composer: "",
    year: "",
  });

  function handleFormChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = event.target;
    setFormData((prevformData) => ({
      ...prevformData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateMusic.mutate(formData);
    if (musicItem) {
      setMusicItem({
        id: musicItem.id,
        title: formData.title ? formData.title : musicItem.title,
        composer: formData.composer ? formData.composer : musicItem.composer,
        year: formData.year ? formData.year : musicItem.year,
        userId: musicItem.userId,
        studentMusic: musicItem.studentMusic,
      });
      setFormData({
        id: musicItem.id,
        title: "",
        composer: "",
        year: "",
      });
    }
    setEdit({
      group: "",
      active: false,
    });
    event.currentTarget.reset();
  };

  // Delete Student

  const deleteMutation = api.music.deleteMusicItem.useMutation({
    onSuccess: async () => {
      await getMusic.refetch();
      await Router.push("/music");
    },
  });

  function deleteMusicItem(id: string) {
    confirm("Are you sure you want to delete this piece of music?");
    deleteMutation.mutate(id);
  }

  return (
    <Layout title={<h1 className="font-lemon text-2xl">Music</h1>}>
      <>
        {getMusicItem.isLoading && (
          <button className="loading btn mt-5 self-center"></button>
        )}

        {musicItem && (
          <div className="flex h-full flex-col items-center gap-5 bg-base-200 pb-10">
            <form
              className="relative mx-5 mt-5 flex w-full max-w-sm flex-col gap-3 rounded-lg bg-base-100 py-8 px-4 text-left shadow-lg"
              onSubmit={handleSubmit}
            >
              <div className="w-32 self-center">
                <DocumentIcon width="5" height="5" />
              </div>
              <div className="relative">
                <h2
                  className={`max-w-fit border-b-2 border-primary text-lg font-semibold ${
                    edit.active ? "border-none" : ""
                  }`}
                >
                  <EditMusicItem
                    handleFormChange={handleFormChange}
                    inputValue={formData.title}
                    edit={edit}
                    setEdit={setEdit}
                    field={"title"}
                    group={"information"}
                    capitalField={"Title"}
                    inputType={"text"}
                    value={musicItem.title ? musicItem.title : ""}
                    placeholder={musicItem.title ? musicItem.title : ""}
                  />
                </h2>
                <div className="absolute top-0 right-0">
                  {edit.active && edit.group === "information" ? (
                    <div className="flex gap-1">
                      <div
                        className="btn-error btn-square btn-xs btn self-start p-1"
                        onClick={() =>
                          setEdit({
                            group: "",
                            active: false,
                          })
                        }
                      >
                        <XIcon width="5" height="5" />
                      </div>
                      <button className="btn-primary btn-square btn-xs btn cursor-pointer p-1">
                        <CheckIcon width="5" height="5" />
                      </button>
                    </div>
                  ) : (
                    <div
                      className="btn-ghost btn-square btn-xs btn p-0.5 opacity-60 hover:opacity-100"
                      onClick={() =>
                        setEdit({
                          group: "information",
                          active: true,
                        })
                      }
                    >
                      <EditIcon width="5" height="5" />
                    </div>
                  )}
                </div>

                <div className="flex w-full flex-col gap-1">
                  <EditMusicItem
                    handleFormChange={handleFormChange}
                    inputValue={formData.composer}
                    edit={edit}
                    setEdit={setEdit}
                    field={"composer"}
                    group={"information"}
                    capitalField={"Composer"}
                    inputType={"text"}
                    value={musicItem.composer ? musicItem.composer : ""}
                    placeholder={musicItem.composer ? musicItem.composer : ""}
                  />

                  <EditMusicItem
                    handleFormChange={handleFormChange}
                    inputValue={formData.year}
                    edit={edit}
                    setEdit={setEdit}
                    field={"year"}
                    group={"information"}
                    capitalField={"Year"}
                    inputType={"text"}
                    value={musicItem.year ? musicItem.year : ""}
                    placeholder={musicItem.year ? musicItem.year : ""}
                  />
                </div>
              </div>
              <div
                className="btn-outline btn-error btn-sm btn self-center transition-transform duration-300 hover:scale-110"
                onClick={() => deleteMusicItem(musicItem.id)}
              >
                Delete
              </div>
            </form>
          </div>
        )}
      </>
    </Layout>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);
  const { id } = ctx.query;

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else if (id && typeof id === "string") {
    const music = await prisma.music.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
      },
    });
    if (id === music?.id) {
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

export default MusicItemPage;
