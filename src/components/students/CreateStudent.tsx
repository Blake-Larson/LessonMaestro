import React, { useEffect, useRef } from "react";
import { api } from "../../utils/api";
import type { StudentWithAllFields } from "../../pages/student/[id]";
import toast from "react-hot-toast";

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
  students: StudentWithAllFields[];
  setStudents: React.Dispatch<React.SetStateAction<StudentWithAllFields[]>>;
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreateStudent({
  students,
  setStudents,
  showForm,
  setShowForm,
}: Props) {
  const getStudents = api.student.getStudents.useQuery(undefined, {
    enabled: false,
    onSuccess: (data) => {
      setStudents(data);
    },
  });

  const createMutation = api.student.createStudent.useMutation({
    onSuccess: async () => {
      await getStudents.refetch();
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  // Form Handling

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
    formData.age = Number(formData.age);
    createMutation.mutate(formData);
    setStudents(
      [
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
          lessons: [],
          music: [],
          concepts: [],
          userId: "",
        },
      ].sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      })
    );
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
    event.currentTarget.reset();
  };

  //Set Focus on state change

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [showForm]);

  return (
    <form onSubmit={handleSubmit} className="form-control flex flex-col gap-2">
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleFormChange}
        className="input-bordered input w-full max-w-xs"
        required
        ref={inputRef}
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
      <button
        className="btn-secondary btn flex gap-2 self-center"
        type="submit"
      >
        <div>Submit</div>
      </button>
    </form>
  );
}

export default CreateStudent;
