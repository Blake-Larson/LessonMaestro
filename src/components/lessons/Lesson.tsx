import dayjs from "dayjs";
import React, { useState } from "react";
import { api } from "~/utils/api";
import type { LessonWithAllFields } from "./Lessons";
import Image from "next/image";
import StudentConceptList from "../students/StudentConceptList";
import type { StudentWithAllFields } from "~/pages/student/[id]";
import Link from "next/link";
import DeleteIcon from "../buttons/DeleteIcon";
import StudentMusicList from "../students/StudentMusicList";

interface Props {
  lesson: LessonWithAllFields;
  lessons: LessonWithAllFields[];
  setLessons: React.Dispatch<
    React.SetStateAction<LessonWithAllFields[] | undefined>
  >;
}

const Lesson = ({ lesson, lessons, setLessons }: Props) => {
  const date = dayjs(lesson.startDate).format("dddd, MM/DD/YY");
  const start = dayjs(lesson.startDate).format("h:mm a");
  const end = dayjs(lesson.endDate).format("h:mm a");
  const [student, setStudent] = useState<StudentWithAllFields | undefined>(
    lesson.student
  );

  // Delete Lesson

  const deleteMutation = api.lesson.deleteLesson.useMutation();

  function deleteMusicItem() {
    deleteMutation.mutate(lesson.id);
    setLessons(() =>
      lessons?.filter(
        (lessonItem: LessonWithAllFields) => lessonItem.id !== lesson.id
      )
    );
  }

  return (
    <div key={lesson.id} className="w-full">
      <div className="collapse-arrow collapse rounded-xl bg-base-100 shadow-lg">
        <input type="checkbox" />
        <div className="collapse-title">
          <div className="flex flex-col items-center justify-between gap-3 font-medium sm:flex-row">
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="relative h-14 w-14 rounded-xl">
                  <Image
                    src={"/images/blank-profile.webp"} // replace with student.image
                    fill
                    sizes="100%"
                    alt={`photo of ${lesson.student.name}`}
                  />
                </div>
              </div>
              <span className="text-lg">{lesson.student.name}</span>
              {/* {lesson.attendance && (
                          <div
                            className={
                              lesson.attendance === "Present"
                                ? "btn-outline btn-primary btn-sm btn bg-base-100"
                                : "btn-outline btn-warning btn-sm btn bg-base-100"
                            }
                          >
                            {lesson.attendance}
                          </div>
                        )}
                        {lesson.payment && (
                          <div
                            className={
                              lesson.payment === "Paid"
                                ? "btn-outline btn-primary btn-sm btn bg-base-100"
                                : "btn-outline btn-warning btn-sm btn bg-base-100"
                            }
                          >
                            {lesson.payment}
                          </div>
                        )} */}
            </div>

            <div className="flex text-center">
              <div className="flex flex-col justify-evenly text-right">
                <span>{date}</span>
                <span>{`${start} - ${end}`}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="collapse-content flex flex-col gap-5 bg-base-100">
          {student && (
            <>
              <StudentMusicList student={student} setStudent={setStudent} />
              <StudentConceptList student={student} setStudent={setStudent} />
            </>
          )}
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <Link
                href={`/student/${encodeURIComponent(lesson.student.id)}`}
                as={`/student/${lesson.student.id}`}
                className="btn-ghost btn border border-base-300 hover:bg-primary"
              >
                Profile
              </Link>
            </div>
            <div className="flex gap-3">
              {/* <button className="btn-outline btn-warning btn">
                        Archive
                      </button> */}
              <div
                className="btn-ghost btn-square btn hover:btn-error"
                onClick={() => deleteMusicItem()}
              >
                <DeleteIcon width={"5"} height={"5"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lesson;
