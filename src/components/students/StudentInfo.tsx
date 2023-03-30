import { useState } from "react";
import React from "react";
import Image from "next/image";
import EditStudent from "./EditStudent";
import { api } from "../../utils/api";
import XIcon from "../buttons/XIcon";
import CheckIcon from "../buttons/CheckIcon";
import EditIcon from "../buttons/EditIcon";
import type { StudentWithAllFields } from "../../pages/student/[id]";

export type FormData = {
  name: string;
  age: number;
  phone: string;
  email: string;
  contact: string;
  instrument: string;
  image: string;
  id: string;
};

interface Props {
  student: StudentWithAllFields;
  setStudent: React.Dispatch<
    React.SetStateAction<StudentWithAllFields | undefined>
  >;
}

export type Edit = {
  group: string;
  active: boolean;
};

function StudentInfo({ student, setStudent }: Props) {
  //Data Handling

  const updateStudent = api.student.updateStudent.useMutation({
    onError: () => {
      console.log(updateStudent.error?.message);
    },
  });
  //Update Status

  const updateStatus = api.student.updateStatus.useMutation();

  function handleStatusUpdate(student: StudentWithAllFields) {
    updateStatus.mutate(student);
    setStudent({
      ...student,
      status: !student.status,
    });
  }

  //Edit Mode

  const [edit, setEdit] = useState<Edit>({
    group: "",
    active: false,
  });

  //Form Handling

  const [formData, setFormData] = React.useState<FormData>({
    name: "",
    age: 0,
    phone: "",
    email: "",
    contact: "",
    instrument: "",
    image: "",
    id: student.id,
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
    if (formData.age) {
      formData.age = Number(formData.age);
    }
    updateStudent.mutate(formData);
    setStudent({
      ...student,
      name: formData.name ? formData.name : student.name,
      age: formData.age ? formData.age : student.age,
      phone: formData.phone ? formData.phone : student.phone,
      email: formData.email ? formData.email : student.email,
      contact: formData.contact ? formData.contact : student.contact,
      instrument: formData.instrument
        ? formData.instrument
        : student.instrument,
      image: formData.image ? formData.image : student.image,
    });
    setFormData({
      name: "",
      age: 0,
      phone: "",
      email: "",
      contact: "",
      instrument: "",
      image: "",
      id: student.id,
    });
    setEdit({
      group: "",
      active: false,
    });
    event.currentTarget.reset();
  };

  return (
    <>
      <form
        className="relative mx-5 mt-5 flex w-full max-w-sm flex-col items-center gap-3 rounded-lg bg-base-100 py-4 shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="absolute top-2 right-2">
          {edit.active && edit.group === "idCard" ? (
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
                  group: "idCard",
                  active: true,
                })
              }
            >
              <EditIcon width="5" height="5" />
            </div>
          )}
        </div>
        <div className="avatar">
          <div className="relative h-16 w-16 rounded-xl">
            <Image
              src={"/images/teach.jpg"} // replace with student.image
              fill
              sizes="100%"
              alt={`photo of ${student.name}`}
            />
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div
            className={`${
              edit.active
                ? "border-none"
                : "border-b-4 border-primary text-2xl font-bold"
            }`}
          >
            <EditStudent
              handleFormChange={handleFormChange}
              inputValue={formData.name}
              edit={edit}
              setEdit={setEdit}
              field={"name"}
              group={"idCard"}
              capitalField={"Name"}
              inputType={"text"}
              value={student.name}
              placeholder={student.name}
            />
          </div>
          <div>
            <EditStudent
              handleFormChange={handleFormChange}
              inputValue={formData.instrument}
              edit={edit}
              setEdit={setEdit}
              field={"instrument"}
              group={"idCard"}
              capitalField={"Instrument"}
              inputType={"text"}
              value={student.instrument ? student.instrument : ""}
              placeholder={student.instrument ? student.instrument : ""}
            />
          </div>
        </div>
      </form>

      <form
        className="relative mx-5 flex w-full max-w-sm flex-col gap-3 rounded-lg bg-base-100 py-8 px-4 text-left shadow-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="max-w-fit border-b-2 border-primary text-lg font-semibold">
          Information
        </h2>
        <div className="absolute top-2 right-2">
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
          <EditStudent
            handleFormChange={handleFormChange}
            inputValue={formData.age ? formData.age.toString() : ""}
            edit={edit}
            setEdit={setEdit}
            field={"age"}
            group={"information"}
            capitalField={"Age"}
            inputType={"number"}
            value={student.age ? student.age.toString() : ""}
            placeholder={student.age ? student.age.toString() : ""}
          />

          <EditStudent
            handleFormChange={handleFormChange}
            inputValue={formData.phone}
            edit={edit}
            setEdit={setEdit}
            field={"phone"}
            group={"information"}
            capitalField={"Phone"}
            inputType={"text"}
            value={student.phone ? student.phone : ""}
            placeholder={student.phone ? student.phone : ""}
          />

          <EditStudent
            handleFormChange={handleFormChange}
            inputValue={formData.email}
            edit={edit}
            setEdit={setEdit}
            field={"email"}
            group={"information"}
            capitalField={"Email"}
            inputType={"email"}
            value={student.email ? student.email : ""}
            placeholder={student.email ? student.email : ""}
          />

          <EditStudent
            handleFormChange={handleFormChange}
            inputValue={formData.contact}
            edit={edit}
            setEdit={setEdit}
            field={"contact"}
            group={"information"}
            capitalField={"Contact"}
            inputType={"text"}
            value={student.contact ? student.contact : ""}
            placeholder={student.contact ? student.contact : ""}
          />

          <div>
            <span
              onClick={() => handleStatusUpdate(student)}
              className={"cursor-pointer"}
            >
              Status: {student.status ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
      </form>
    </>
  );
}

export default StudentInfo;
