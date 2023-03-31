import type { Concept } from "@prisma/client";
import React from "react";
import { api } from "~/utils/api";
import AddIcon from "../buttons/AddIcon";

interface Props {
  studentId: string;
  setConcepts: React.Dispatch<React.SetStateAction<Concept[] | undefined>>;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormData {
  text: string;
}

function CreateConcept({ studentId, setConcepts, setShowForm }: Props) {
  const getConcepts = api.concept.getConcepts.useQuery(studentId, {
    enabled: false,
    onSuccess: (data) => {
      setConcepts(data);
    },
  });

  const createMutation = api.concept.createConcept.useMutation({
    onSuccess: async () => {
      setFormData({
        text: "",
      });
      await getConcepts.refetch();
    },
    onError: () => {
      console.log(createMutation.error?.message);
    },
  });

  // Form Handling

  const [formData, setFormData] = React.useState<FormData>({
    text: "",
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
    createMutation.mutate({ text: formData.text, studentId: studentId });
    setConcepts((prevConcepts) => {
      if (prevConcepts) {
        return [
          ...prevConcepts,
          { id: "", text: formData.text, studentId: studentId, userId: "" },
        ];
      }
    });
    setShowForm(false);
    event.currentTarget.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex w-full items-center gap-1 p-3">
          <input
            name="text"
            placeholder="Enter a new concept..."
            className="input-bordered input h-8 w-full max-w-xs"
            onChange={handleFormChange}
            required
          />
          <button className="cursor-pointer rounded-md border border-base-300 bg-base-100 p-0.5 transition-all duration-300 hover:bg-secondary">
            <AddIcon width="5" height="5" />
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateConcept;
