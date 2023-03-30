import React from "react";
import dayjs from "dayjs";
import type { StudentWithAllFields } from "~/pages/student/[id]";
import XIcon from "../buttons/XIcon";
import { api } from "~/utils/api";

interface Props {
  student: StudentWithAllFields;
  setStudent: React.Dispatch<
    React.SetStateAction<StudentWithAllFields | undefined>
  >;
}

const StudentLessonList = ({ student, setStudent }: Props) => {
  //Delete Lesson

  const deleteMutation = api.lesson.deleteLesson.useMutation();

  function deleteLesson(lessonId: string) {
    deleteMutation.mutate(lessonId);
    setStudent({
      ...student,
      lessons: student.lessons.filter((lesson) => lesson.id !== lessonId),
    });
  }

  return (
    <div className="mx-5 flex w-full max-w-sm flex-col gap-3 rounded-lg bg-base-100 py-4 px-4 text-left shadow-lg">
      <h2 className="max-w-fit border-b-2 border-primary text-lg font-semibold">
        Lessons
      </h2>
      <ul className="w-full">
        {student.lessons.map((lesson, i) => {
          const date = dayjs(student.lessons[i]?.startDate).format(
            "ddd, MM/DD/YY"
          );
          const start = dayjs(student.lessons[i]?.startDate).format("h:mm a");
          const end = dayjs(student.lessons[i]?.endDate).format("h:mm a");
          return (
            <li key={lesson.id} className="flex justify-between">
              <div className="flex gap-3">
                <span>{date}</span>
                <span>{`${start} - ${end}`}</span>
              </div>
              <div
                className="btn-ghost btn-square btn-xs btn cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-error"
                onClick={() => deleteLesson(lesson.id)}
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

export default StudentLessonList;
