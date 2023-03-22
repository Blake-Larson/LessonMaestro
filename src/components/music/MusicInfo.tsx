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
  setMusicItem: React.Dispatch<
    React.SetStateAction<MusicItemWithAllFields | undefined>
  >;
}

export type Edit = {
  group: string;
  active: boolean;
};

function MusicInfo({ musicItem, setMusicItem }: Props) {
  //Data Handling

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
    <>
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
    </>
  );
}

export default MusicInfo;
