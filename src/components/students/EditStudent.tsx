import type { SetStateAction } from "react";
import React, { useEffect, useRef } from "react";
import CheckIcon from "../buttons/CheckIcon";
import { api } from "../../utils/api";
import type { StudentType } from "../../pages/students";
import XIcon from "../buttons/XIcon";
import type { Edit } from "../../pages/student-profile/[id]";
import type { FieldType } from "./StudentInput";

type FormData = {
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
  student: StudentType;
  setStudent: React.Dispatch<SetStateAction<StudentType | undefined>>;
  field: keyof FieldType;
  inputType: string;
  setEdit: React.Dispatch<React.SetStateAction<Edit>>;
  placeholder: string;
}

const EditStudent = ({
  student,
  setStudent,
  field,
  inputType,
  setEdit,
  placeholder,
}: Props) => {
  const getStudent = api.student.getStudentByID.useQuery(
    { id: student.id },
    {
      enabled: false,
      onSuccess: (data) => {
        if (data) {
          setStudent(data);
        }
      },
    }
  );

  const updateStudent = api.student.updateStudent.useMutation({
    onSuccess: async () => {
      setStudent({
        name: formData.name ? formData.name : student.name,
        age: formData.age ? formData.age : student.age,
        phone: formData.phone ? formData.phone : student.phone,
        email: formData.email ? formData.email : student.email,
        contact: formData.contact ? formData.contact : student.contact,
        instrument: formData.instrument
          ? formData.instrument
          : student.instrument,
        status: true,
        image: formData.image ? formData.image : student.image,
        id: student.id,
        lesson: student.lesson,
        music: student.music,
        work: student.work,
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
        id: "",
        field: "",
        active: false,
      });
      await getStudent.refetch();
    },
    onError: () => {
      console.log(updateStudent.error?.message);
    },
  });

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
    event.currentTarget.reset();
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [student]);

  return (
    <form className="flex items-center gap-1" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        className="input-bordered input mr-1 h-6 w-56"
        name={field}
        type={inputType}
        placeholder={placeholder}
        value={formData[field]}
        onChange={handleFormChange}
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
  );
};

export default EditStudent;
