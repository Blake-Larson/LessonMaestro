import { useState } from "react";
import React, { useEffect, useRef } from "react";
import CheckIcon from "../buttons/CheckIcon";
import { api } from "../../utils/api";
import XIcon from "../buttons/XIcon";
import type { Music } from "@prisma/client";

type FieldType = {
  title: string;
  composer: string;
};

type Edit = {
  id: string;
  field: string;
  active: boolean;
};

interface Props {
  item: Music;
  setItem: React.Dispatch<React.SetStateAction<Music | undefined>>;
  field: keyof FieldType;
  value: string | number | readonly string[] | undefined;
  placeholder: string;
}

interface FormData {
  id: string;
  title: string;
  composer: string;
  year: string;
}

function EditMusicItem({ item, setItem, field, value, placeholder }: Props) {
  const updateMusicItem = api.music.updateMusicItem.useMutation({
    onSuccess: () => {
      setItem({
        id: item.id,
        title: formData.title ? formData.title : item.title,
        composer: formData.composer ? formData.composer : item.composer,
        year: formData.year ? formData.year : item.year,
        studentId: item.studentId,
        userId: item.userId,
      });
      setFormData({
        id: item.id,
        title: "",
        composer: "",
        year: "",
      });
      setEdit({
        id: "",
        field: "",
        active: false,
      });
    },
    onError: () => {
      console.log(updateMusicItem.error?.message);
    },
  });

  //Edit Mode

  const [edit, setEdit] = useState<Edit>({
    id: "",
    field: "",
    active: false,
  });

  // Form Handling

  const [formData, setFormData] = React.useState<FormData>({
    id: item.id,
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
    updateMusicItem.mutate(formData);
    event.currentTarget.reset();
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [item]);

  return (
    <div>
      {edit.field === field && edit.active ? (
        <form className="flex items-center gap-1" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            className="input-bordered input mr-1 h-6 w-56"
            name={field}
            type="text"
            placeholder={placeholder}
            onChange={handleFormChange}
            value={formData[field]}
          />
          <button className="btn-primary btn-square btn-xs btn cursor-pointer p-1">
            <CheckIcon width="5" height="5" />
          </button>
          <div
            className="btn-error btn-square btn-xs btn cursor-pointer p-1"
            onClick={() => {
              setEdit({
                id: "",
                field: "",
                active: false,
              });
            }}
          >
            <XIcon width="5" height="5" />
          </div>
        </form>
      ) : (
        <span
          className={`cursor-pointer ${value ? "opacity-100" : "opacity-50"}`}
          onClick={() =>
            setEdit({
              id: item.id,
              field: field,
              active: true,
            })
          }
        >
          {value ? value : "composer"}
        </span>
      )}
    </div>
  );
}

export default EditMusicItem;
