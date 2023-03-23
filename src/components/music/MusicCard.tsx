import { useState } from "react";
import React from "react";
import EditMusicItem from "./EditMusicItem";
import { api } from "../../utils/api";
import XIcon from "../buttons/XIcon";
import CheckIcon from "../buttons/CheckIcon";
import EditIcon from "../buttons/EditIcon";
import type { MusicItemWithAllFields } from "../../pages/music/[id]";
import DocumentIcon from "../buttons/DocumentIcon";

export type FormData = {
  id: string;
  title: string;
  composer: string;
  year: string;
};

interface Props {
  musicItem: MusicItemWithAllFields;
  music: MusicItemWithAllFields[];
  setMusic: React.Dispatch<React.SetStateAction<MusicItemWithAllFields[]>>;
}

export type Edit = {
  musicItemId: string;
  group: string;
  active: boolean;
};

function MusicCard({ musicItem, music, setMusic }: Props) {
  //Data Handling

  const updateMusic = api.music.updateMusicItem.useMutation({
    onError: () => {
      console.log(updateMusic.error?.message);
    },
  });

  //Edit Mode

  const [edit, setEdit] = useState<Edit>({
    musicItemId: "",
    group: "",
    active: false,
  });

  //Form Handling

  const [formData, setFormData] = React.useState<FormData>({
    id: musicItem.id,
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
    setMusic(
      [
        ...music.filter((item) => item.id !== musicItem.id),
        {
          id: musicItem.id,
          title: formData.title ? formData.title : musicItem.title,
          composer: formData.composer ? formData.composer : musicItem.composer,
          year: formData.year ? formData.year : musicItem.year,
          userId: musicItem.userId,
          studentMusic: musicItem.studentMusic,
        },
      ].sort(function (a, b) {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      })
    );
    setFormData({
      id: "",
      title: "",
      composer: "",
      year: "",
    });
    setEdit({
      musicItemId: "",
      group: "",
      active: false,
    });
    event.currentTarget.reset();
  };

  // Delete Student

  const deleteMutation = api.music.deleteMusicItem.useMutation();

  function deleteMusicItem(id: string) {
    confirm("Are you sure you want to delete this piece of music?");
    deleteMutation.mutate(id);
  }

  return (
    <>
      <form
        className="relative mx-5 mt-5 flex w-full max-w-xs flex-col gap-3 rounded-lg bg-base-100 py-8 px-4 text-left shadow-lg"
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
              id={musicItem.id}
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
                      musicItemId: "",
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
                    musicItemId: musicItem.id,
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
              id={musicItem.id}
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
              id={musicItem.id}
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
    </>
  );
}

export default MusicCard;
