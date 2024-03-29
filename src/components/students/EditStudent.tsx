import type { ChangeEventHandler, SetStateAction } from "react";
import React from "react";
import type { Edit } from "./StudentInfo";

export type FieldType = {
  name: string;
  age: string;
  phone: string;
  email: string;
  contact: string;
  instrument: string;
  image: string;
};

interface Props {
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

function EditStudent({
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
      {group !== "idCard" && (
        <span className={"inline-block w-20"}>{`${capitalField}: `}</span>
      )}
      {edit.group === group && edit.active ? (
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
  );
}

export default EditStudent;
