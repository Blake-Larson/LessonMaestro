import React, { useState } from "react";
import AddIcon from "../buttons/AddIcon";
import { api } from "../../utils/api";
import type { MusicItemType } from "./MusicItem";
import XIcon from "../buttons/XIcon";

interface Props {
  studentId: string;
  music: MusicItemType[];
  setMusic: React.Dispatch<React.SetStateAction<MusicItemType[]>>;
}

interface FormData {
  studentId: string;
  title: string;
  composer: string;
}

function CreateMusicItem({ studentId, music, setMusic }: Props) {
  const [showForm, setShowForm] = useState<boolean>(false);

  const getMusic = api.music.getMusic.useQuery(studentId, {
    enabled: false,
    onSuccess: (data) => {
      setMusic(data);
    },
  });
  const createMutation = api.music.createMusicItem.useMutation({
    onSuccess: async () => {
      setMusic([
        ...music,
        {
          id: "",
          title: formData.title,
          composer: formData.composer,
        },
      ]);
      setFormData({
        studentId: studentId,
        title: "",
        composer: "",
      });
      await getMusic.refetch();
    },
    onError: () => {
      console.log(createMutation.error?.message);
    },
  });

  // Form Handling

  const [formData, setFormData] = React.useState<FormData>({
    studentId: studentId,
    title: "",
    composer: "",
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
    createMutation.mutate(formData);
    event.currentTarget.reset();
  };

  return (
    <>
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
      {showForm && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="flex gap-1">
            <input
              name="title"
              placeholder="Title"
              className="input-bordered input h-8 w-48"
              onChange={handleFormChange}
              required
            />
            <input
              name="composer"
              placeholder="Composer"
              className="input-bordered input h-8 w-40 "
              onChange={handleFormChange}
            />
          </div>
          <button className="btn-secondary btn flex gap-2 self-center">
            <div>Submit</div>
          </button>
        </form>
      )}
    </>
  );
}

export default CreateMusicItem;
