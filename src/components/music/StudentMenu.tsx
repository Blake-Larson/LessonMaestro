import type { Student } from "@prisma/client";
import React from "react";
import type { MusicItemWithAllFields } from "../../pages/music";
import AddIcon from "../buttons/AddIcon";

interface Props {
  musicItem: MusicItemWithAllFields;
  unconnectedStudents: Student[] | undefined;
  addStudent: (musicId: string, studentId: string, student: Student) => void;
}

const StudentMenu = ({ musicItem, unconnectedStudents, addStudent }: Props) => {
  return (
    <div className="group relative w-full">
      <button className="flex w-full items-center justify-center gap-1 rounded bg-base-200 py-2">
        <span className="">Add to a student</span>
        <svg
          className="h-4 w-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </button>
      <ul className="absolute z-10 hidden max-h-52 w-full overflow-auto rounded-b border border-t-0 border-base-200 bg-base-100 group-hover:flex group-hover:flex-col">
        {unconnectedStudents?.map((student: Student) => (
          <li
            key={student.id}
            className="btn-ghost btn flex w-full animate-none justify-start gap-3"
            onClick={() => addStudent(musicItem.id, student.id, student)}
          >
            <button className={"w-5"}>
              <AddIcon width="5" height="5" />
            </button>
            <div>{student.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentMenu;
