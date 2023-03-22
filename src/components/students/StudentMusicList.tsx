import { SetStateAction, useEffect } from "react";
import { useState } from "react";
import React from "react";
import Image from "next/image";
import EditStudent from "./EditStudent";
import { api } from "../../utils/api";
import XIcon from "../buttons/XIcon";
import CheckIcon from "../buttons/CheckIcon";
import EditIcon from "../buttons/EditIcon";
import type { StudentWithAllFields } from "../../pages/student-profile/[id]";
import AddIcon from "../buttons/AddIcon";

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
  setStudent: React.Dispatch<SetStateAction<StudentWithAllFields | undefined>>;
}

export type Edit = {
  group: string;
  active: boolean;
};

function StudentMusicList({ student, setStudent }: Props) {
  //Data Handling

  const getStudent = api.student.getStudentByID.useQuery(
    {
      id: student.id,
    },
    {
      enabled: false,
      onSuccess: (data) => {
        if (data) {
          setStudent(data);
        }
      },
    }
  );

  const getOtherMusic = api.music.getMusicByStudentId.useQuery(student.id);

  //Add Music Item to Student

  const addStudentMusic = api.student.addStudentMusic.useMutation();

  function addMusicItem(musicId: string, studentId: string) {
    addStudentMusic.mutate({ musicId, studentId });
  }

  //Delete MusicItem from Student

  const deleteMutation = api.student.removeStudentMusic.useMutation();

  function deleteMusicItem(musicId: string, studentId: string) {
    deleteMutation.mutate({ musicId, studentId });
    // setMusic(music.filter((musicItem: MusicItemType) => musicItem.id !== id));
  }

  return (
    <div className="relative mx-5 flex w-full max-w-sm flex-col gap-3 rounded-lg bg-base-100 py-8 px-4 text-left shadow-lg">
      <h2 className="max-w-fit border-b-2 border-primary text-lg font-semibold">
        Music
      </h2>
      <ul className="w-full">
        {getStudent.data?.studentMusic.map((musicItem) => (
          <li key={musicItem.musicId} className={"flex justify-between"}>
            <div>{musicItem.music.title}</div>

            <div
              className="btn-ghost btn-square btn-xs btn cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-error"
              onClick={() => deleteMusicItem(musicItem.musicId, student.id)}
            >
              <XIcon width="5" height="5" />
            </div>
          </li>
        ))}
      </ul>
      <div>
        <h4 className="">Add More music to student</h4>
        <ul className="w-full">
          {getOtherMusic.data?.map((musicItem) => (
            <li key={musicItem.id} className="flex gap-3">
              <button
                className={
                  "btn-ghost btn-square btn-xs btn p-0.5 hover:btn-secondary"
                }
                onClick={() => addMusicItem(musicItem.id, student.id)}
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
{
  /* 
            Have a list of assigned music

            Have a way to add and remove pieces

            Have an edit button that links to music profile page

            maybe put all the pieces in a dropdown?
            
            */
}
