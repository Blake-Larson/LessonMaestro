import { useState } from "react";
import React from "react";
import { api } from "../../utils/api";
import XIcon from "../buttons/XIcon";
import type { Student } from "@prisma/client";
import type { MusicItemWithAllFields } from "../../pages/music";
import StudentMenu from "./StudentMenu";

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
  musicItem: MusicItemWithAllFields;
}

export type Edit = {
  group: string;
  active: boolean;
};

function MusicStudentList(props: Props) {
  const [musicItem, setMusicItem] = useState(props.musicItem);
  //Data Handling

  const [unconnectedStudents, setUnconnectedStudents] = useState<Student[]>();
  api.student.getStudetsByNotMusicId.useQuery(musicItem.id, {
    onSuccess: (data) => {
      if (data) {
        setUnconnectedStudents(data);
      }
    },
  });

  //Add Student to MusicItem

  const connectMusictoStudent = api.student.connectMusictoStudent.useMutation();

  function addMusicItem(musicId: string, studentId: string, student: Student) {
    connectMusictoStudent.mutate({ musicId, studentId });
    setMusicItem({ ...musicItem, student: [...musicItem.student, student] });

    setUnconnectedStudents(
      unconnectedStudents?.filter(
        (student: Student) => student.id !== studentId
      )
    );
  }

  //Delete Student from MusicItem

  const disconnectMusicFromStudent =
    api.student.disconnectMusicFromStudent.useMutation();

  function deleteMusicItem(
    musicId: string,
    studentId: string,
    student: Student
  ) {
    disconnectMusicFromStudent.mutate({ musicId, studentId });
    if (unconnectedStudents) {
      setUnconnectedStudents(
        [...unconnectedStudents, student].sort(function (a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        })
      );
    }
    setMusicItem({
      ...musicItem,
      student: musicItem.student.filter((student) => student.id !== studentId),
    });
  }

  return (
    <div>
      <h2 className="max-w-fit border-b-2 border-primary text-lg font-semibold">
        Students
      </h2>
      <div className="flex flex-col gap-5">
        <ul className="w-full">
          {musicItem.student?.map((student: Student) => (
            <li key={student.id} className={"flex justify-between"}>
              <div>{student.name}</div>

              <div
                className="btn-ghost btn-square btn-xs btn cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-error"
                onClick={() =>
                  deleteMusicItem(musicItem.id, student.id, student)
                }
              >
                <XIcon width="5" height="5" />
              </div>
            </li>
          ))}
        </ul>
        <StudentMenu
          musicItem={musicItem}
          unconnectedStudents={unconnectedStudents}
          addMusicItem={addMusicItem}
        />
      </div>
    </div>
  );
}

export default MusicStudentList;
