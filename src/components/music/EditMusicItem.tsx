import type { ChangeEventHandler, SetStateAction } from "react";
import React from "react";
import type { Edit } from "./MusicCard";

type FieldType = {
  title: string;
  composer: string;
  year: string;
};

interface Props {
  id: string;
  handleFormChange: ChangeEventHandler<HTMLInputElement> | undefined;
  inputValue: string;
  edit: Edit;
  setEdit: React.Dispatch<SetStateAction<Edit>>;
  field: keyof FieldType;
  group: string;
  capitalField: string;
  inputType: string;
  value: string;
  placeholder: string;
}

function EditMusicItem({
  id,
  handleFormChange,
  inputValue,
  edit,
  field,
  group,
  capitalField,
  inputType,
  value,
  placeholder,
}: Props) {
  return (
    <div>
      <div>
        {field !== "title" && (
          <span className={"inline-block w-24"}>{`${capitalField}: `}</span>
        )}
        {edit.group === group && edit.active && edit.musicItemId === id ? (
          <div className="flex items-center gap-1">
            <input
              className="input-bordered input mr-1 h-6 w-56"
              name={field}
              type={inputType}
              placeholder={placeholder}
              value={inputValue}
              onChange={handleFormChange}
            />
          </div>
        ) : (
          <span className="h-full w-full">
            <span className={`${value ? "opacity-100" : "opacity-50"}`}>
              {value}
            </span>
          </span>
        )}
      </div>
    </div>
  );
}

export default EditMusicItem;
