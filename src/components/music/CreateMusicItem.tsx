import React from "react";
import { useEffect, useRef } from "react";
import { api } from "../../utils/api";
import type { MusicItemWithAllFields } from "../../pages/music";
import toast from "react-hot-toast";

interface FormData {
  studentId: string;
  title: string;
  composer: string;
  year: string;
}

interface Props {
  setMusic: React.Dispatch<React.SetStateAction<MusicItemWithAllFields[]>>;
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreateMusicItem({ setMusic, showForm, setShowForm }: Props) {
  const getMusic = api.music.getMusic.useQuery(undefined, {
    enabled: false,
    onSuccess: (data) => {
      setMusic(data);
    },
  });
  const createMutation = api.music.createMusicItem.useMutation({
    onSuccess: async () => {
      await getMusic.refetch();
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  // Form Handling

  const [formData, setFormData] = React.useState<FormData>({
    studentId: "",
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
    createMutation.mutate(formData);
    setMusic((prevMusic) =>
      [
        ...prevMusic,
        {
          id: "",
          title: formData.title,
          composer: formData.composer,
          year: "",
          userId: "",
          student: [],
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
      studentId: "",
      title: "",
      composer: "",
      year: "",
    });
    setShowForm(false);
    event.currentTarget.reset();
  };

  //Set Focus on state change

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [showForm]);

  return (
    <>
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            name="title"
            placeholder="Title"
            className="input-bordered input h-12"
            onChange={handleFormChange}
            required
          />
          <input
            type="text"
            name="composer"
            placeholder="Composer"
            className="input-bordered input h-12"
            onChange={handleFormChange}
          />
          <input
            type="text"
            name="year"
            placeholder="Year"
            className="input-bordered input h-12"
            onChange={handleFormChange}
          />
          <button className="btn-secondary btn self-center">
            <div>Submit</div>
          </button>
        </form>
      )}
    </>
  );
}

export default CreateMusicItem;
