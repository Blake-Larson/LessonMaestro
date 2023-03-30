import { type Music, Prisma, type Concept } from "@prisma/client";
import React, { useState } from "react";
import { api } from "~/utils/api";
import DeleteIcon from "../buttons/DeleteIcon";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import Image from "next/image";
import LessonMusic from "./LessonMusic";

dayjs.extend(relativeTime);

const lessonWithAllFields = Prisma.validator<Prisma.LessonArgs>()({
  include: {
    student: {
      include: {
        music: true,
        concepts: true,
      },
    },
  },
});

export type LessonWithAllFields = Prisma.LessonGetPayload<
  typeof lessonWithAllFields
>;

const Lessons = () => {
  const [lessons, setLessons] = useState<LessonWithAllFields[]>();

  const getLessons = api.lesson.getLessons.useQuery(undefined, {
    onSuccess: (data) => {
      setLessons(data);
    },
  });

  // Delete Student

  const deleteMutation = api.lesson.deleteLesson.useMutation();

  function deleteMusicItem(id: string) {
    deleteMutation.mutate(id);
    setLessons(
      lessons?.filter((lesson: LessonWithAllFields) => lesson.id !== id)
    );
  }

  return (
    <>
      <div className="flex w-full max-w-3xl flex-col items-center gap-5">
        <h2 className="text-xl font-semibold">Upcoming Lessons</h2>
        {lessons?.map((lesson) => {
          const weekday = dayjs(lesson.startDate).format("dddd");
          const date = dayjs(lesson.startDate).format("MM/DD/YY");
          const start = dayjs(lesson.startDate).format("h:mm");
          const end = dayjs(lesson.endDate).format("h:mm");
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
                            src={"/images/teach.jpg"} // replace with student.image
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
                        <span>{`${weekday}, ${date}`}</span>
                        <span>{`${start} - ${end}`}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="collapse-content flex flex-col gap-5 bg-base-100">
                  <LessonMusic lesson={lesson} />
                  <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/student/${encodeURIComponent(
                          lesson.student.id
                        )}`}
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
                        onClick={() => deleteMusicItem(lesson.id)}
                      >
                        <DeleteIcon width={"5"} height={"5"} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Lessons;
