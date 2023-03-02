import React from "react";
import { api } from "../../utils/api";
import Student from "./Student";
import { StudentType } from "../../pages/students";

interface Props {
  students: StudentType[];
  setStudents: React.Dispatch<React.SetStateAction<StudentType[]>>;
}

function StudentTable({ students, setStudents }: Props) {
  return (
    <div>
      <div className="hidden w-full overflow-x-auto rounded-t-xl">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="bg-accent-light">Name</th>
              <th className="bg-accent-light">Instrument</th>
              <th className="bg-accent-light">Phone</th>
              <th className="bg-accent-light">Email</th>
            </tr>
          </thead>
          <tbody>
            {students?.map((student) => {
              return <Student key={student.id} student={student} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentTable;
