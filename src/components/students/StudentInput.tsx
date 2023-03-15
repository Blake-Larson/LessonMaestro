import type { SetStateAction } from "react";
import React from "react";
import type { Edit } from "../../pages/student-profile/[id]";
import type { StudentType } from "../../pages/students";
import EditStudent from "./EditStudent";

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
  student: StudentType;
  setStudent: React.Dispatch<SetStateAction<StudentType | undefined>>;
  edit: Edit;
  setEdit: React.Dispatch<React.SetStateAction<Edit>>;
  field: keyof FieldType;
  capitalField: string;
  inputType: string;
  value: string;
}
//can we combine this component with editStudent?
function StudentInput({
  student,
  setStudent,
  edit,
  setEdit,
  field,
  capitalField,
  inputType,
  value,
}: Props) {
  return (
    <div>
      {field !== "name" && field !== "instrument" && (
        <span
          className={`inline-block w-20 ${
            value ? "opacity-100" : "opacity-70"
          }`}
        >{`${capitalField}: `}</span>
      )}
      {edit.field === field && edit.active ? (
        <EditStudent
          student={student}
          setStudent={setStudent}
          field={field}
          inputType={inputType}
          setEdit={setEdit}
          placeholder={value}
        />
      ) : (
        <span
          className="cursor-pointer"
          onClick={() =>
            setEdit({
              id: student.id,
              field: field,
              active: true,
            })
          }
        >
          {value}
        </span>
      )}
    </div>
  );
}

export default StudentInput;
