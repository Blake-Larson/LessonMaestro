import { useState } from "react";
import React from "react";
import { api } from "../../utils/api";
import XIcon from "../buttons/XIcon";
import type { StudentWithAllFields } from "../../pages/student/[id]";
import AddIcon from "../buttons/AddIcon";
import type { Music } from "@prisma/client";

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

function StudentMusicList({ student, setStudent }: Props) {
  //Data Handling

  const [music, setMusic] = useState<Music[]>();
  api.music.getMusicByStudentId.useQuery(student.id, {
    onSuccess: (data) => {
      if (data) {
        setMusic(data);
      }
    },
  });

  //Add Music Item to Student

  const connectMusictoStudent = api.student.connectMusictoStudent.useMutation();

  function addMusicItem(musicId: string, studentId: string, musicItem: Music) {
    connectMusictoStudent.mutate({ musicId, studentId });
    setStudent({
      ...student,
      music: [...student.music, musicItem],
    });
    setMusic(music?.filter((musicItem: Music) => musicItem.id !== musicId));
  }

  //Delete MusicItem from Student

  const disconnectMusicFromStudent =
    api.student.disconnectMusicFromStudent.useMutation();

  function deleteMusicItem(
    musicId: string,
    studentId: string,
    musicItem: Music
  ) {
    disconnectMusicFromStudent.mutate({ musicId, studentId });
    if (music) {
      setMusic(
        [...music, musicItem].sort(function (a, b) {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0;
        })
      );
    }
    setStudent({
      ...student,
      music: student.music.filter((musicItem) => musicItem.id !== musicId),
    });
  }

  return (
    <div className="relative mx-5 flex w-full max-w-sm flex-col gap-3 rounded-lg bg-base-100 py-8 px-4 text-left shadow-lg">
      <h2 className="max-w-fit border-b-2 border-primary text-lg font-semibold">
        Music
      </h2>
      <ul className="w-full">
        {student.music.map((musicItem: Music) => (
          <li key={musicItem.id} className={"flex justify-between"}>
            <div>{musicItem.title}</div>

            <div
              className="btn-ghost btn-square btn-xs btn cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-error"
              onClick={() =>
                deleteMusicItem(musicItem.id, student.id, musicItem)
              }
            >
              <XIcon width="5" height="5" />
            </div>
          </li>
        ))}
      </ul>

      <div>
        <h4 className="">Add More music to student</h4>
        <ul className="w-full">
          {music?.map((musicItem: Music) => (
            <li key={musicItem.id} className="flex gap-3">
              <button
                className={
                  "btn-ghost btn-square btn-xs btn p-0.5 hover:btn-secondary"
                }
                onClick={() =>
                  addMusicItem(musicItem.id, student.id, musicItem)
                }
              >
                <AddIcon width="5" height="5" />
              </button>
              <div>{musicItem.title}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StudentMusicList;
