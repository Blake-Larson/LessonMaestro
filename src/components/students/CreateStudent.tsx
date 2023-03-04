import React from "react";
import AddIcon from "../buttons/AddIcon";
import { api } from "../../utils/api";
import type { StudentType } from "../../pages/students";

type FormData = {
  name: string;
  age: number;
  phone: string;
  email: string;
  contact: string;
  instrument: string;
  image: string;
};

interface Props {
  students: StudentType[];
  setStudents: React.Dispatch<React.SetStateAction<StudentType[]>>;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreateStudent({ students, setStudents, setShowForm }: Props) {
  const getStudents = api.student.getStudents.useQuery(undefined, {
    enabled: false,
    onSuccess: (data) => {
      setStudents(data);
    },
  });

  const createMutation = api.student.createStudent.useMutation({
    onSuccess: async () => {
      setStudents([
        ...students,
        {
          name: formData.name,
          age: formData.age,
          phone: formData.phone,
          email: formData.email,
          contact: formData.contact,
          instrument: formData.instrument,
          status: true,
          image: formData.image,
          id: "",
          lesson: [],
          music: [],
          work: [],
        },
      ]);
      await getStudents.refetch();
      setFormData({
        name: "",
        age: 0,
        phone: "",
        email: "",
        contact: "",
        instrument: "",
        image: "",
      });
      setShowForm(false);
    },
    onError: () => {
      console.log(createMutation.error?.message);
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
    console.log(formData, "Form Data");
    createMutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form-control flex flex-col gap-2">
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleFormChange}
        className="input-bordered input w-full max-w-xs"
        required
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        onChange={handleFormChange}
        className="input-bordered input w-full max-w-xs"
      />
      <input
        type="tel"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        name="phone"
        placeholder="123-456-7890"
        onChange={handleFormChange}
        className="input-bordered input w-full max-w-xs"
      />
      <input
        type="text"
        name="email"
        placeholder="Email"
        onChange={handleFormChange}
        className="input-bordered input w-full max-w-xs"
      />
      <input
        type="text"
        name="contact"
        placeholder="Contact"
        onChange={handleFormChange}
        className="input-bordered input w-full max-w-xs"
      />
      <input
        type="text"
        name="instrument"
        placeholder="Instrument"
        onChange={handleFormChange}
        className="input-bordered input w-full max-w-xs"
      />
      <button className="btn-secondary btn flex gap-2">
        <div>Submit</div>
        <div className="cursor-pointer rounded-md border border-base-300 bg-base-100 p-0.5">
          <AddIcon width="6" height="6" />
        </div>
      </button>
    </form>
  );
}

export default CreateStudent;
