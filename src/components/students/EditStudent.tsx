import React, { useEffect, useRef } from "react";
import CheckIcon from "../buttons/CheckIcon";
import { api } from "../../utils/api";
import type { StudentType } from "../../pages/students";

type Edit = {
  id: string;
  field: string;
  active: boolean;
};

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
  setStudent: React.Dispatch<React.SetStateAction<StudentType>>;
  field: string;
  inputType: string;
  setEdit: React.Dispatch<React.SetStateAction<Edit>>;
}

const EditStudent = ({
  student,
  setStudent,
  field,
  inputType,
  setEdit,
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
        className="w-44 rounded border p-2"
        name={field}
        type={inputType}
        placeholder={student[field]}
        value={formData[field]}
        onChange={handleFormChange}
      />
      <button className="hover:bg-green-500 cursor-pointer rounded-full p-1 duration-300 ease-in-out">
        <CheckIcon width="5" height="5" />
      </button>
    </form>
  );
};

export default EditStudent;
