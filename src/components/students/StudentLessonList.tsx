import React from "react";
import dayjs from "dayjs";
import type { StudentWithAllFields } from "~/pages/student/[id]";

interface Props {
  student: StudentWithAllFields;
}

const StudentLessonList = ({ student }: Props) => {
  return (
    <div>
      {student.lesson.map((lesson, i) => {
        const date = dayjs(student.lesson[i]?.startDate).format(
          "ddd, MM/DD/YY"
        );
        const start = dayjs(student.lesson[i]?.startDate).format("h:mm a");
        const end = dayjs(student.lesson[i]?.endDate).format("h:mm a");
        return (
          <li key={lesson.id} className="flex gap-3">
            <span>{date}</span>
            <span>{`${start} - ${end}`}</span>
          </li>
        );
      })}
    </div>
  );
};

export default StudentLessonList;
