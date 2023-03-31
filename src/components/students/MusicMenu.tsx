import type { Music } from "@prisma/client";
import Link from "next/link";
import React from "react";
import type { StudentWithAllFields } from "../../pages/student/[id]";
import AddIcon from "../buttons/AddIcon";

interface Props {
  student: StudentWithAllFields;
  music: Music[] | undefined;
  addMusicItem: (musicId: string, studentId: string, musicItem: Music) => void;
}

const MusicMenu = ({ student, music, addMusicItem }: Props) => {
  return (
    <div className="group relative w-full">
      <button className="flex items-center justify-center gap-1 rounded bg-blue-100 py-2 px-4">
        <span className="">Add additional music</span>
        <svg
          className="h-4 w-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </button>
      <ul className="absolute z-10 hidden max-h-52 min-w-[250px] max-w-sm overflow-auto rounded-b border border-blue-50 bg-base-100 group-hover:flex group-hover:flex-col">
        {music?.map((musicItem: Music) => (
          <li
            key={musicItem.id}
            className="flex w-full cursor-pointer justify-start gap-3 p-3 transition-all duration-300 hover:bg-blue-50"
            onClick={() => addMusicItem(musicItem.id, student.id, musicItem)}
          >
            <button className="w-5">
              <AddIcon width="5" height="5" />
            </button>
            <div>{musicItem.title}</div>
          </li>
        ))}
        <Link
          href={"/music"}
          className="flex w-full cursor-pointer justify-start p-3 transition-all duration-300 hover:bg-blue-50"
        >
          Create more music
        </Link>
      </ul>
    </div>
  );
};

export default MusicMenu;
