import type { Concept } from "@prisma/client";
import React, { useEffect } from "react";
import type { StudentWithAllFields } from "~/pages/student/[id]";
import { api } from "~/utils/api";
import AddIcon from "../buttons/AddIcon";
import XIcon from "../buttons/XIcon";
import CreateConcept from "../concepts/CreateConcept";

interface Props {
  student: StudentWithAllFields;
  setStudent: React.Dispatch<
    React.SetStateAction<StudentWithAllFields | undefined>
  >;
}

const StudentConceptList = ({ student, setStudent }: Props) => {
  const [showForm, setShowForm] = React.useState(false);
  const [concepts, setConcepts] = React.useState<Concept[]>();

  useEffect(() => {
    setConcepts(student.concepts);
  }, [student.concepts]);

  //Delete Concept
  const deleteMutation = api.concept.deleteConcept.useMutation();

  function deleteLesson(conceptId: string) {
    deleteMutation.mutate(conceptId);
    setStudent({
      ...student,
      concepts: student.concepts.filter((concept) => concept.id !== conceptId),
    });
  }

  return (
    <div className="mx-5 flex w-full max-w-sm flex-col gap-3 rounded-lg bg-base-100 py-4 px-4 text-left shadow-lg">
      <div className="flex items-center gap-2">
        <h2 className="max-w-fit border-b-2 border-primary text-lg font-semibold">
          Concepts
        </h2>
        <button
          className={`btn-square btn-xs btn rounded-md p-0.5 ${
            showForm
              ? "btn-error"
              : "btn-ghost border border-base-300 hover:btn-secondary"
          }`}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? (
            <XIcon width="5" height="5" />
          ) : (
            <AddIcon width="5" height="5" />
          )}
        </button>
      </div>
      {showForm && concepts && (
        <CreateConcept
          studentId={student.id}
          setConcepts={setConcepts}
          setShowForm={setShowForm}
        />
      )}
      <ul className="w-full">
        {concepts?.map((concept) => {
          return (
            <li key={concept.id} className="flex justify-between gap-3">
              <span>{concept.text}</span>
              <div
                className="btn-ghost btn-square btn-xs btn cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-error"
                onClick={() => deleteLesson(concept.id)}
              >
                <XIcon width="5" height="5" />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StudentConceptList;
